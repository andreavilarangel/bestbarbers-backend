import { Injectable } from '@nestjs/common';
import {
  BlockedTimeCreateDTO,
  BlockedTimeUpdateDTO,
  BlockedTimeFindAllDTO,
} from 'src/app/dtos/BlockedTime.dto';
import { FindAllPresent } from 'src/app/presenter/FindAll.presenter';
import { BlockedTimePresenter } from 'src/app/presenter/BlockedTime.presenter';
import { BlockedTimeCreateService } from './BlockedTimeCreate.service';
import { BlockedTimeFindService } from './BlockedTimeFind.service';
import { BlockedTimeHandleInterface } from './BlockedTimeHandle.interface';
import { BlockedTimeUpdateService } from './BlockedTimeUpdate.service';

@Injectable()
export class BlockedTimeHandle implements BlockedTimeHandleInterface {
  constructor(
    private readonly blockedTimeCreate: BlockedTimeCreateService,
    private readonly blockedTimeUpdate: BlockedTimeUpdateService,
    private readonly blockedTimeFind: BlockedTimeFindService,
  ) {}

  async createOneBlockedTime(
    newBlockedTime: BlockedTimeCreateDTO,
  ): Promise<BlockedTimePresenter> {
    return this.blockedTimeCreate.createOneBlockedTime(newBlockedTime);
  }

  async updateOneBlockedTime(
    blockedTimeId: string,
    dataBlockedTime: BlockedTimeUpdateDTO,
  ): Promise<BlockedTimePresenter> {
    return this.blockedTimeUpdate.updateOneBlockedTime(
      blockedTimeId,
      dataBlockedTime,
    );
  }

  async findOneBlockedTimeById(
    blockedTimeId: string,
  ): Promise<BlockedTimePresenter> {
    return this.blockedTimeFind.findOneBlockedTimeById(blockedTimeId);
  }

  async findAllBlockedTime(
    params: BlockedTimeFindAllDTO,
  ): Promise<FindAllPresent<BlockedTimePresenter>> {
    return this.blockedTimeFind.findAllBlockedTime(params);
  }
}
