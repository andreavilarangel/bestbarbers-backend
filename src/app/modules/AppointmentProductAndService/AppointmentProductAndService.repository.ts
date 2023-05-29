import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/infrastructure/database/prisma/prisma.service';
import {
  FindAllParamsType,
  FindAllResponseType,
} from 'src/shared/FindAll.type';
import { AppointmentProductAndServiceEntity } from './AppointmentProductAndService.entity';

@Injectable()
export class AppointmentProductAndServiceRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(
    newAppointmentProductAndService: Prisma.AppointmentProductAndServiceCreateInput,
  ): Promise<AppointmentProductAndServiceEntity> {
    return this.prisma.appointmentProductAndService.create({
      data: newAppointmentProductAndService,
      include: {
        barbershop: true,
        product_service: true,
        employer: true,
        appointment: true,
      },
    });
  }

  async update(
    appointmentProductAndServiceId: string,
    dataAppointmentProductAndService: Prisma.AppointmentProductAndServiceUpdateInput,
  ): Promise<AppointmentProductAndServiceEntity> {
    return this.prisma.appointmentProductAndService.update({
      where: {
        id: appointmentProductAndServiceId,
      },
      data: dataAppointmentProductAndService,
    });
  }

  async findOne(
    appointmentProductAndServiceId: string,
  ): Promise<AppointmentProductAndServiceEntity> {
    return this.prisma.appointmentProductAndService.findUnique({
      where: {
        id: appointmentProductAndServiceId,
      },
    });
  }

  async findAll(
    params: FindAllParamsType<Prisma.AppointmentProductAndServiceWhereInput>,
  ): Promise<FindAllResponseType<AppointmentProductAndServiceEntity>> {
    return this.prisma.$transaction([
      this.prisma.appointmentProductAndService.findMany({
        skip: params.skip,
        take: params.take,
        where: params.where,
      }),
      this.prisma.appointmentProductAndService.count({ where: params.where }),
    ]);
  }

  async delete(
    appointmentProductAndServiceId: string,
  ): Promise<AppointmentProductAndServiceEntity> {
    return this.prisma.appointmentProductAndService.delete({
      where: {
        id: appointmentProductAndServiceId,
      },
    });
  }
}
