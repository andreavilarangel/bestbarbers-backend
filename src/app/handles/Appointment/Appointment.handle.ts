import { Injectable } from '@nestjs/common';
import { omit } from 'radash';
import {
  AppointmentCreateDTO,
  AppointmentUpdateDTO,
  AppointmentFindAllDTO,
} from 'src/app/dtos/Appointment.dto';
import { FindAllPresent } from 'src/shared/FindAll.presenter';
import { AppointmentPresenter } from 'src/app/modules/Appointment/Appointment.presenter';
import { AppointmentRepository } from 'src/app/modules/Appointment/Appointment.repository';
import { AppointmentProductAndServiceHandle } from '../AppointmentProductAndService/AppointmentProductAndService.handle';

@Injectable()
export class AppointmentHandle {
  constructor(
    private readonly appointmentRepository: AppointmentRepository,
    private readonly appointmentProductAndServiceHandle: AppointmentProductAndServiceHandle,
  ) {}

  async createOneAppointment(
    newAppointment: AppointmentCreateDTO,
  ): Promise<AppointmentPresenter> {
    const {
      barbershop_id,
      client_id,
      employer_id,
      date,
      start_hour,
      finish_hour,
      products_and_services,
    } = newAppointment;

    const appointment = await this.appointmentRepository.create({
      date,
      start_hour,
      finish_hour,
      barbershop: { connect: { id: barbershop_id } },
      employer: { connect: { id: employer_id } },
      client: { connect: { id: client_id } },
    });

    products_and_services.forEach((item) =>
      this.appointmentProductAndServiceHandle.createOneAppointmentProductAndService(
        {
          appointment_id: appointment.id,
          barbershop_id,
          employer_id,
          employer_percentage: 10,
          employer_value: 10,
          product_service_id: item.id,
        },
      ),
    );

    return appointment;
  }

  async updateOneAppointment(
    appointmentId: string,
    dataAppointment: AppointmentUpdateDTO,
  ): Promise<AppointmentPresenter> {
    return this.appointmentRepository.update(appointmentId, dataAppointment);
  }

  async findOneAppointmentById(
    appointmentId: string,
  ): Promise<AppointmentPresenter> {
    return this.appointmentRepository.findOne(appointmentId);
  }
}
