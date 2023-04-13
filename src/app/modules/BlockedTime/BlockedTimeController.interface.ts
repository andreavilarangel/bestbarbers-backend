
import {BlockedTimeCreateDTO, BlockedTimeUpdateDTO, BlockedTimeFindAllDTO} from 'src/app/dtos/BlockedTime.dto'
import { BlockedTimePresenter } from 'src/app/presenter/BlockedTime.presenter'
import { FindAllPresent } from 'src/app/presenter/FindAll.presenter'

export interface BlockedTimeControllerInterface {
  createOneBlockedTime(newBlockedTime: BlockedTimeCreateDTO): Promise<BlockedTimePresenter>
  updateOneBlockedTime(blockedTimeId: string, dataBlockedTime: BlockedTimeUpdateDTO): Promise<BlockedTimePresenter>
  getOneBlockedTimeById(blockedTimeId: string): Promise<BlockedTimePresenter>
  getAllBlockedTime(queries: BlockedTimeFindAllDTO): Promise<FindAllPresent<BlockedTimePresenter>>
}
