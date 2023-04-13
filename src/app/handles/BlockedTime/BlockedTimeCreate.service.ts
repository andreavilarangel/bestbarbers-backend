import { Injectable } from '@nestjs/common';
import { omit } from 'radash';
import { BlockedTimeCreateDTO } from 'src/app/dtos/BlockedTime.dto';
import { BlockedTimePresenter } from 'src/app/presenter/BlockedTime.presenter';
import { BlockedTimeRepository } from 'src/core/repositories/BlockedTime.repository';
import { BlockedTimeCreateServiceInterface } from './BlockedTimeHandle.interface';
import { BarbershopFindService } from '../Barbershop/BarbershopFind.service';

@Injectable()
export class BlockedTimeCreateService
  implements BlockedTimeCreateServiceInterface
{
  constructor(
    private readonly blockedTimeRepository: BlockedTimeRepository,
    private readonly barbershopFindService: BarbershopFindService,
  ) {}

  async createOneBlockedTime(
    newBlockedTime: BlockedTimeCreateDTO,
  ): Promise<BlockedTimePresenter> {
    const { barbershop_id } = newBlockedTime;
    await this.barbershopFindService.findOneBarbershopById(barbershop_id);

    return this.blockedTimeRepository.create({
      ...omit(newBlockedTime, ['barbershop_id']),
      barbershop: { connect: { id: barbershop_id } },
    });
  }
}
