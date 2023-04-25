import { Injectable } from '@nestjs/common';
import { BlockedTimeFindAllDTO } from 'src/app/dtos/BlockedTime.dto';
import { BlockedTimePresenter } from 'src/app/presenter/BlockedTime.presenter';
import { FindAllPresent } from 'src/app/presenter/FindAll.presenter';
import { BlockedTimeRepository } from 'src/core/repositories/BlockedTime.repository';
import { BlockedTimeFindServiceInterface } from './BlockedTimeHandle.interface';
import { BlockedTimeNotFoundException } from 'src/app/errors/BlockedTime.error';

@Injectable()
export class BlockedTimeFindService implements BlockedTimeFindServiceInterface {
  constructor(private readonly blockedTimeRepository: BlockedTimeRepository) {}

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
