import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/infrastructure/database/prisma/prisma.service';
import {
  FindAllParamsType,
  FindAllResponseType,
} from 'src/shared/FindAll.type';
import { EmployerEntity } from './Employer.entity';

@Injectable()
export class EmployerRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(
    newEmployer: Prisma.EmployerCreateInput,
  ): Promise<EmployerEntity> {
    return this.prisma.employer.create({
      data: newEmployer,
    });
  }

  async update(
    employerId: string,
    dataEmployer: Prisma.EmployerUpdateInput,
  ): Promise<EmployerEntity> {
    return this.prisma.employer.update({
      where: {
        id: employerId,
      },
      data: dataEmployer,
    });
  }

  async findOne(employerId: string): Promise<EmployerEntity> {
    return this.prisma.employer.findUnique({
      where: {
        id: employerId,
      },
    });
  }

  async findAll(
    params: FindAllParamsType<Prisma.EmployerWhereInput>,
  ): Promise<FindAllResponseType<EmployerEntity>> {
    return this.prisma.$transaction([
      this.prisma.employer.findMany({
        skip: params.skip,
        take: params.take,
        where: params.where,
        include: { user: true },
      }),
      this.prisma.employer.count({ where: params.where }),
    ]);
  }

  async delete(employerId: string): Promise<EmployerEntity> {
    return this.prisma.employer.delete({
      where: {
        id: employerId,
      },
    });
  }
}
