import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/infrastructure/database/prisma/prisma.service';
import {
  FindAllParamsType,
  FindAllResponseType,
} from 'src/shared/FindAll.type';
import { AppointmentEntity } from './Appointment.entity';

@Injectable()
export class AppointmentRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(
    newAppointment: Prisma.AppointmentCreateInput,
  ): Promise<AppointmentEntity> {
    return this.prisma.appointment.create({
      data: newAppointment,
      include: {
        barbershop: true,
        client: true,
        employer: true,
      },
    });
  }

  async update(
    appointmentId: string,
    dataAppointment: Prisma.AppointmentUpdateInput,
  ): Promise<AppointmentEntity> {
    return this.prisma.appointment.update({
      where: {
        id: appointmentId,
      },
      data: dataAppointment,
    });
  }

  async findOne(appointmentId: string): Promise<AppointmentEntity> {
    return this.prisma.appointment.findUnique({
      where: {
        id: appointmentId,
      },
    });
  }

  async findAll(
    params: FindAllParamsType<Prisma.AppointmentWhereInput>,
  ): Promise<FindAllResponseType<AppointmentEntity>> {
    return this.prisma.$transaction([
      this.prisma.appointment.findMany({
        skip: params.skip,
        take: params.take,
        where: params.where,
      }),
      this.prisma.appointment.count({ where: params.where }),
    ]);
  }

  async delete(appointmentId: string): Promise<AppointmentEntity> {
    return this.prisma.appointment.delete({
      where: {
        id: appointmentId,
      },
    });
  }
}
