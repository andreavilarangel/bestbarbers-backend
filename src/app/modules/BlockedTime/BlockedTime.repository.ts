import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/infrastructure/database/prisma/prisma.service';
import {
  FindAllParamsType,
  FindAllResponseType,
} from 'src/shared/FindAll.type';
import { BlockedTimeEntity } from './BlockedTime.entity';

@Injectable()
export class BlockedTimeRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(
    newBlockedTime: Prisma.BlockedTimeCreateInput,
  ): Promise<BlockedTimeEntity> {
    return this.prisma.blockedTime.create({
      data: newBlockedTime,
      include: {
        barbershop: true,
        employer: true,
      },
    });
  }

  async update(
    blockedTimeId: string,
    dataBlockedTime: Prisma.BlockedTimeUpdateInput,
  ): Promise<BlockedTimeEntity> {
    return this.prisma.blockedTime.update({
      where: {
        id: blockedTimeId,
      },
      data: dataBlockedTime,
      include: {
        barbershop: true,
        employer: true,
      },
    });
  }

  async findOne(blockedTimeId: string): Promise<BlockedTimeEntity> {
    return this.prisma.blockedTime.findUnique({
      where: {
        id: blockedTimeId,
      },
    });
  }

  async findAll(
    params: FindAllParamsType<Prisma.BlockedTimeWhereInput>,
  ): Promise<FindAllResponseType<BlockedTimeEntity>> {
    return this.prisma.$transaction([
      this.prisma.blockedTime.findMany({
        skip: params.skip,
        take: params.take,
        where: params.where,
      }),
      this.prisma.blockedTime.count({ where: params.where }),
    ]);
  }

  async delete(blockedTimeId: string): Promise<BlockedTimeEntity> {
    return this.prisma.blockedTime.delete({
      where: {
        id: blockedTimeId,
      },
    });
  }
}
