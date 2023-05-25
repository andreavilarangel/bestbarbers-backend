import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/infrastructure/database/prisma/prisma.service';
import {
  FindAllParamsType,
  FindAllResponseType,
} from 'src/shared/interfaces/FindAll.type';
import { AddressEntity } from './Address.entity';

@Injectable()
export class AddressRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(newAddress: Prisma.AddressCreateInput): Promise<AddressEntity> {
    return this.prisma.address.create({
      data: newAddress,
    });
  }

  async update(
    addressId: string,
    dataAddress: Prisma.AddressUpdateInput,
  ): Promise<AddressEntity> {
    return this.prisma.address.update({
      where: {
        id: addressId,
      },
      data: dataAddress,
    });
  }

  async findOne(addressId: string): Promise<AddressEntity> {
    return this.prisma.address.findUnique({
      where: {
        id: addressId,
      },
    });
  }

  async findByBarbershopId(barbershop_id: string): Promise<AddressEntity> {
    return this.prisma.address.findFirst({
      where: {
        barbershop_id,
      },
    });
  }

  async findAll(
    params: FindAllParamsType<Prisma.AddressWhereInput>,
  ): Promise<FindAllResponseType<AddressEntity>> {
    return this.prisma.$transaction([
      this.prisma.address.findMany({
        skip: params.skip,
        take: params.take,
        where: params.where,
      }),
      this.prisma.address.count({ where: params.where }),
    ]);
  }

  async delete(addressId: string): Promise<AddressEntity> {
    return this.prisma.address.delete({
      where: {
        id: addressId,
      },
    });
  }
}
