import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/infrastructure/database/prisma/prisma.service';
import {
  FindAllParamsType,
  FindAllResponseType,
} from 'src/shared/FindAll.type';
import { ServiceEntity } from './Service.entity';

@Injectable()
export class ServiceRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(newService: Prisma.ServiceCreateInput): Promise<ServiceEntity> {
    return this.prisma.service.create({
      data: newService,
    });
  }

  async update(
    serviceId: string,
    dataService: Prisma.ServiceUpdateInput,
  ): Promise<ServiceEntity> {
    return this.prisma.service.update({
      where: {
        id: serviceId,
      },
      data: dataService,
    });
  }

  async findOne(serviceId: string): Promise<ServiceEntity> {
    return this.prisma.service.findUnique({
      where: {
        id: serviceId,
      },
    });
  }

  async findAll(
    params: FindAllParamsType<Prisma.ServiceWhereInput>,
  ): Promise<FindAllResponseType<ServiceEntity>> {
    return this.prisma.$transaction([
      this.prisma.service.findMany({
        skip: params.skip,
        take: params.take,
        where: params.where,
      }),
      this.prisma.service.count({ where: params.where }),
    ]);
  }

  async delete(serviceId: string): Promise<ServiceEntity> {
    return this.prisma.service.delete({
      where: {
        id: serviceId,
      },
    });
  }
}
