import { Prisma } from '@prisma/client';
import { BlockedTimeEntity } from 'src/app/modules/BlockedTime/BlockedTime.entity';
import {
  FindAllParamsType,
  FindAllResponseType,
} from 'src/shared/interfaces/FindAll.type';

export interface BlockedTimeRepositoryInterface {
  create(
    newBlockedTime: Prisma.BlockedTimeCreateInput,
  ): Promise<BlockedTimeEntity>;
  update(
    blockedTimeId: string,
    dataBlockedTime: Prisma.BlockedTimeUpdateInput,
  ): Promise<BlockedTimeEntity>;
  findOne(blockedTimeId: string): Promise<BlockedTimeEntity>;
  findAll(
    params: FindAllParamsType<Prisma.BlockedTimeWhereInput>,
  ): Promise<FindAllResponseType<BlockedTimeEntity>>;
  delete(blockedTimeId: string): Promise<BlockedTimeEntity>;
}
