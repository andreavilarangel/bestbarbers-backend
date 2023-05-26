import { Injectable } from '@nestjs/common';
import {
  AppointmentProductAndServiceCreateDTO,
  AppointmentProductAndServiceUpdateDTO,
  AppointmentProductAndServiceFindAllDTO,
} from 'src/app/dtos/AppointmentProductAndService.dto';
import { FindAllPresent } from 'src/shared/FindAll.presenter';
import { AppointmentProductAndServicePresenter } from 'src/app/modules/AppointmentProductAndService/AppointmentProductAndService.presenter';
import { AppointmentProductAndServiceRepository } from 'src/app/modules/AppointmentProductAndService/AppointmentProductAndService.repository';

@Injectable()
export class AppointmentProductAndServiceHandle {
  constructor(
    private readonly appointmentProductAndServiceRepository: AppointmentProductAndServiceRepository,
  ) {}

  async createOneAppointmentProductAndService(
    newAppointmentProductAndService: AppointmentProductAndServiceCreateDTO,
  ): Promise<AppointmentProductAndServicePresenter> {
    const {
      barbershop_id,
      employer_id,
      employer_percentage,
      employer_value,
      product_service_id,
      appointment_id,
    } = newAppointmentProductAndService;
    return this.appointmentProductAndServiceRepository.create({
      employer_percentage,
      employer_value,
      barbershop: { connect: { id: barbershop_id } },
      employer: { connect: { id: employer_id } },
      product_service: { connect: { id: product_service_id } },
      appointment: { connect: { id: appointment_id } },
    });
  }

  async updateOneAppointmentProductAndService(
    appointmentProductAndServiceId: string,
    dataAppointmentProductAndService: AppointmentProductAndServiceUpdateDTO,
  ): Promise<AppointmentProductAndServicePresenter> {
    return this.appointmentProductAndServiceRepository.update(
      appointmentProductAndServiceId,
      dataAppointmentProductAndService,
    );
  }

  async findOneAppointmentProductAndServiceById(
    appointmentProductAndServiceId: string,
  ): Promise<AppointmentProductAndServicePresenter> {
    return this.appointmentProductAndServiceRepository.findOne(
      appointmentProductAndServiceId,
    );
  }
}
