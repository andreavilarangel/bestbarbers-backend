import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/infrastructure/database/prisma/prisma.service';
import {
  FindAllParamsType,
  FindAllResponseType,
} from 'src/shared/FindAll.type';
import { EmployerProductAndServiceEntity } from './EmployerProductAndService.entity';

@Injectable()
export class EmployerProductAndServiceRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(
    newEmployerProductAndService: Prisma.EmployerProductAndServiceCreateInput,
  ): Promise<EmployerProductAndServiceEntity> {
    return this.prisma.employerProductAndService.create({
      data: newEmployerProductAndService,
    });
  }

  async update(
    employerProductAndServiceId: string,
    dataEmployerProductAndService: Prisma.EmployerProductAndServiceUpdateInput,
  ): Promise<EmployerProductAndServiceEntity> {
    return this.prisma.employerProductAndService.update({
      where: {
        id: employerProductAndServiceId,
      },
      data: dataEmployerProductAndService,
      include: {
        barbershop: true,
        employer: true,
        product_and_service: true,
      },
    });
  }

  async findOne(
    employer_id: string,
    product_and_service_id: string,
  ): Promise<EmployerProductAndServiceEntity> {
    return this.prisma.employerProductAndService.findFirst({
      where: {
        employer_id,
        product_and_service_id,
      },
    });
  }

  async findAll(
    params: FindAllParamsType<Prisma.EmployerProductAndServiceWhereInput>,
  ): Promise<FindAllResponseType<EmployerProductAndServiceEntity>> {
    return this.prisma.$transaction([
      this.prisma.employerProductAndService.findMany({
        skip: params.skip,
        take: params.take,
        where: params.where,
      }),
      this.prisma.employerProductAndService.count({ where: params.where }),
    ]);
  }

  async delete(
    employerProductAndServiceId: string,
  ): Promise<EmployerProductAndServiceEntity> {
    return this.prisma.employerProductAndService.delete({
      where: {
        id: employerProductAndServiceId,
      },
    });
  }
}
