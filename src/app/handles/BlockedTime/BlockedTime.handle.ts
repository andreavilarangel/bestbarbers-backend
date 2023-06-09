import { Injectable } from '@nestjs/common';
import { omit } from 'radash';
import {
  BlockedTimeCreateDTO,
  BlockedTimeUpdateDTO,
  BlockedTimeFindAllDTO,
} from 'src/app/modules/BlockedTime/BlockedTime.dto';
import { FindAllPresent } from 'src/shared/FindAll.presenter';
import { BlockedTimePresenter } from 'src/app/modules/BlockedTime/BlockedTime.presenter';

import { BlockedTimeRepository } from 'src/app/modules/BlockedTime/BlockedTime.repository';
import { BarbershopHandle } from '../Barbershop/Barbershop.handle';
import { BlockedTimeNotFoundException } from 'src/app/modules/BlockedTime/BlockedTime.error';

@Injectable()
export class BlockedTimeHandle {
  constructor(
    private readonly barbershopHandle: BarbershopHandle,
    private readonly blockedTimeRepository: BlockedTimeRepository,
  ) {}

  async createOneBlockedTime(
    newBlockedTime: BlockedTimeCreateDTO,
  ): Promise<BlockedTimePresenter> {
    const { barbershop_id } = newBlockedTime;
    await this.barbershopHandle.findOneBarbershopById(barbershop_id);

    return this.blockedTimeRepository.create({
      ...omit(newBlockedTime, ['barbershop_id', 'employer_id']),
      barbershop: { connect: { id: barbershop_id } },
      employer: newBlockedTime.employer_id && {
        connect: { id: newBlockedTime.employer_id },
      },
    });
  }

  async findOneBlockedTimeById(
    blockedTimeId: string,
  ): Promise<BlockedTimePresenter> {
    const blockedTime = await this.blockedTimeRepository.findOne(blockedTimeId);

    if (!blockedTime) throw new BlockedTimeNotFoundException({ blockedTimeId });

    return blockedTime;
  }

  async findAllBlockedTime(
    barbershop_id: string,
  ): Promise<FindAllPresent<BlockedTimePresenter>> {
    const [data, total] = await this.blockedTimeRepository.findAll({
      where: { barbershop_id: barbershop_id },
    });

    return {
      data,
      total,
    };
  }

  async findBlockedTimeToAvailable(
    barbershop_id: string,
    day_of_week: number,
    date: string,
  ): Promise<FindAllPresent<BlockedTimePresenter>> {
    const [data, total] = await this.blockedTimeRepository.findAll({
      where: {
        barbershop_id: barbershop_id,
        OR: [
          { repeat_every_week_day: day_of_week },
          { repeat_every_day: true },
          { date },
        ],
      },
    });

    return {
      data,
      total,
    };
  }

  async deleteOneProductAndService(
    blocked_time_id: string,
  ): Promise<BlockedTimePresenter> {
    // valida se existe ProductAndService
    await this.findOneBlockedTimeById(blocked_time_id);
    return this.blockedTimeRepository.delete(blocked_time_id);
  }
}
