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
      ...omit(newBlockedTime, ['barbershop_id']),
      barbershop: { connect: { id: barbershop_id } },
    });
  }

  async updateOneBlockedTime(
    blockedTimeId: string,
    dataBlockedTime: BlockedTimeUpdateDTO,
  ): Promise<BlockedTimePresenter> {
    // valida se existe BlockedTime
    await this.findOneBlockedTimeById(blockedTimeId);

    return this.blockedTimeRepository.update(blockedTimeId, dataBlockedTime);
  }

  async findOneBlockedTimeById(
    blockedTimeId: string,
  ): Promise<BlockedTimePresenter> {
    const blockedTime = await this.blockedTimeRepository.findOne(blockedTimeId);

    if (!blockedTime) throw new BlockedTimeNotFoundException({ blockedTimeId });

    return blockedTime;
  }

  async findAllBlockedTime(
    params: BlockedTimeFindAllDTO,
  ): Promise<FindAllPresent<BlockedTimePresenter>> {
    const [data, total] = await this.blockedTimeRepository.findAll({
      skip: params.skip,
      take: params.take,
      where: { barbershop_id: params.barbershop_id },
    });

    return {
      data,
      total,
    };
  }
}
