import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/infrastructure/database/prisma/prisma.service';
import {
  FindAllParamsType,
  FindAllResponseType,
} from 'src/shared/interfaces/FindAll.type';
import { BarbershopEntity } from './Barbershop.entity';

@Injectable()
export class BarbershopRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(
    newBarbershop: Prisma.BarbershopCreateInput,
  ): Promise<BarbershopEntity> {
    return this.prisma.barbershop.create({
      data: newBarbershop,
      include: { user: true },
    });
  }

  async update(
    barbershopId: string,
    dataBarbershop: Prisma.BarbershopUpdateInput,
  ): Promise<BarbershopEntity> {
    return this.prisma.barbershop.update({
      where: {
        id: barbershopId,
      },
      data: dataBarbershop,
      include: { user: true },
    });
  }

  async findOne(barbershopId: string): Promise<BarbershopEntity> {
    return this.prisma.barbershop.findUnique({
      where: {
        id: barbershopId,
      },
    });
  }

  async findByUserId(user_id: string): Promise<BarbershopEntity> {
    return this.prisma.barbershop.findFirst({
      where: {
        user_id,
      },
    });
  }

  async findAll(
    params: FindAllParamsType<Prisma.BarbershopWhereInput>,
  ): Promise<FindAllResponseType<BarbershopEntity>> {
    return this.prisma.$transaction([
      this.prisma.barbershop.findMany({
        skip: params.skip,
        take: params.take,
        where: params.where,
      }),
      this.prisma.barbershop.count({ where: params.where }),
    ]);
  }

  async delete(barbershopId: string): Promise<BarbershopEntity> {
    return this.prisma.barbershop.delete({
      where: {
        id: barbershopId,
      },
    });
  }
}
