import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/infrastructure/database/prisma/prisma.service';
import {
  FindAllParamsType,
  FindAllResponseType,
} from 'src/shared/FindAll.type';
import { BarbershopClientEntity } from './BarbershopClient.entity';

@Injectable()
export class BarbershopClientRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(
    newBarbershopClient: Prisma.BarbershopClientCreateInput,
  ): Promise<BarbershopClientEntity> {
    return this.prisma.barbershopClient.create({
      data: newBarbershopClient,
    });
  }

  async update(
    barbershopClientId: string,
    dataBarbershopClient: Prisma.BarbershopClientUpdateInput,
  ): Promise<BarbershopClientEntity> {
    return this.prisma.barbershopClient.update({
      where: {
        id: barbershopClientId,
      },
      data: dataBarbershopClient,
    });
  }

  async findOne(
    clientId: string,
    barbershopId: string,
  ): Promise<BarbershopClientEntity> {
    return this.prisma.barbershopClient.findFirst({
      where: {
        client_id: clientId,
        barbershop_id: barbershopId,
      },
    });
  }

  async findAll(
    params: FindAllParamsType<Prisma.BarbershopClientWhereInput>,
  ): Promise<FindAllResponseType<BarbershopClientEntity>> {
    return this.prisma.$transaction([
      this.prisma.barbershopClient.findMany({
        ...params,
        where: params.where,
      }),
      this.prisma.barbershopClient.count({ where: params.where }),
    ]);
  }

  async delete(barbershopClientId: string): Promise<BarbershopClientEntity> {
    return this.prisma.barbershopClient.delete({
      where: {
        id: barbershopClientId,
      },
    });
  }
}
