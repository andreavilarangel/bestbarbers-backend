import { Injectable } from '@nestjs/common';
import { BlockedTimeUpdateDTO } from 'src/app/dtos/BlockedTime.dto';
import { BlockedTimePresenter } from 'src/app/presenter/BlockedTime.presenter';
import { BlockedTimeRepository } from 'src/core/repositories/BlockedTime.repository';
import { BlockedTimeFindService } from './BlockedTimeFind.service';
import { BlockedTimeUpdateServiceInterface } from './BlockedTimeHandle.interface';

@Injectable()
export class BlockedTimeUpdateService
  implements BlockedTimeUpdateServiceInterface
{
  constructor(
    private readonly blockedTimeRepository: BlockedTimeRepository,
    private readonly blockedTimeFindService: BlockedTimeFindService,
  ) {}

  async updateOneBlockedTime(
    blockedTimeId: string,
    dataBlockedTime: BlockedTimeUpdateDTO,
  ): Promise<BlockedTimePresenter> {
    // valida se existe BlockedTime
    await this.blockedTimeFindService.findOneBlockedTimeById(blockedTimeId);

    return this.blockedTimeRepository.update(blockedTimeId, dataBlockedTime);
  }
}
