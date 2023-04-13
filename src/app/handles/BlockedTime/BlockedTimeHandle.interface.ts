import {
  BlockedTimeCreateDTO,
  BlockedTimeUpdateDTO,
  BlockedTimeFindAllDTO,
} from 'src/app/dtos/BlockedTime.dto';
import { FindAllPresent } from 'src/app/presenter/FindAll.presenter';
import { BlockedTimePresenter } from 'src/app/presenter/BlockedTime.presenter';

export interface BlockedTimeCreateServiceInterface {
  createOneBlockedTime(
    newBlockedTime: BlockedTimeCreateDTO,
  ): Promise<BlockedTimePresenter>;
}

export interface BlockedTimeUpdateServiceInterface {
  updateOneBlockedTime(
    blockedTimeId: string,
    dataBlockedTime: BlockedTimeUpdateDTO,
  ): Promise<BlockedTimePresenter>;
}

export interface BlockedTimeFindServiceInterface {
  findOneBlockedTimeById(blockedTimeId: string): Promise<BlockedTimePresenter>;
  findAllBlockedTime(
    params: BlockedTimeFindAllDTO,
  ): Promise<FindAllPresent<BlockedTimePresenter>>;
}

export interface BlockedTimeHandleInterface
  extends BlockedTimeCreateServiceInterface,
    BlockedTimeUpdateServiceInterface,
    BlockedTimeFindServiceInterface {}
