import { Injectable } from '@nestjs/common';
import { omit } from 'radash';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/infrastructure/database/prisma/prisma.service';
import {
  FindAllParamsType,
  FindAllResponseType,
} from 'src/shared/interfaces/FindAll.type';
import { BarbershopOpeningHourRepositoryInterface } from './interface/BarbershopOpeningHourRepository.interface';
import { BarbershopOpeningHourEntity } from '../entities/BarbershopOpeningHour.entity';

@Injectable()
export class BarbershopOpeningHourRepository
  implements BarbershopOpeningHourRepositoryInterface
{
  constructor(private readonly prisma: PrismaService) {}

  async create(
    newBarbershopOpeningHour: Prisma.BarbershopOpeningHourCreateInput,
  ): Promise<BarbershopOpeningHourEntity> {
    return this.prisma.barbershopOpeningHour.create({
      data: newBarbershopOpeningHour,
    });
  }

  async update(
    barbershopOpeningHourId: string,
    dataBarbershopOpeningHour: Prisma.BarbershopOpeningHourUpdateInput,
  ): Promise<BarbershopOpeningHourEntity> {
    return this.prisma.barbershopOpeningHour.update({
      where: {
        id: barbershopOpeningHourId,
      },
      data: dataBarbershopOpeningHour,
    });
  }

  async updateMany(hoursList: any): Promise<any> {
    const data = await hoursList.map(async (day: any) => {
      const response = await this.prisma.barbershopOpeningHour.update({
        where: {
          id: day.id,
        },
        data: {
          finish_hour: day.finish_hour,
          start_hour: day.start_hour,
          is_closed: day.is_closed,
        },
      });
      return response;
    });
    return data;
  }

  async findOne(
    barbershopOpeningHourId: string,
  ): Promise<BarbershopOpeningHourEntity> {
    return this.prisma.barbershopOpeningHour.findUnique({
      where: {
        id: barbershopOpeningHourId,
      },
    });
  }

  async findByDay(
    barbershopOpeningHourDay: number,
    barbershop_id: string,
  ): Promise<BarbershopOpeningHourEntity> {
    return this.prisma.barbershopOpeningHour.findFirst({
      where: {
        day: barbershopOpeningHourDay,
        barbershop_id,
      },
    });
  }

  async findAll(
    params: FindAllParamsType<Prisma.BarbershopOpeningHourWhereInput>,
  ): Promise<FindAllResponseType<BarbershopOpeningHourEntity>> {
    return this.prisma.$transaction([
      this.prisma.barbershopOpeningHour.findMany({
        skip: params.skip,
        take: params.take,
        where: params.where,
      }),
      this.prisma.barbershopOpeningHour.count({ where: params.where }),
    ]);
  }

  async delete(
    barbershopOpeningHourId: string,
  ): Promise<BarbershopOpeningHourEntity> {
    return this.prisma.barbershopOpeningHour.delete({
      where: {
        id: barbershopOpeningHourId,
      },
    });
  }
}
