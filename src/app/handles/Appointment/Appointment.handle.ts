import { Injectable } from '@nestjs/common';
import { getISODay } from 'date-fns';
import {
  AppointmentCreateDTO,
  AppointmentUpdateDTO,
  AvailableTimesDTO,
} from 'src/app/modules/Appointment/Appointment.dto';
import { FindAllPresent } from 'src/shared/FindAll.presenter';
import { AppointmentPresenter } from 'src/app/modules/Appointment/Appointment.presenter';
import { AppointmentRepository } from 'src/app/modules/Appointment/Appointment.repository';
import { AppointmentProductAndServiceRepository } from 'src/app/modules/AppointmentProductAndService/AppointmentProductAndService.repository';
import { BarbershopHandle } from '../Barbershop/Barbershop.handle';
import { EmployerHandle } from '../Employer/Employer.handle';
import { BlockedTimeHandle } from '../BlockedTime/BlockedTime.handle';
import { BarbershopOpeningHourHandle } from '../BarbershopOpeningHour/BarbershopOpeningHour.handle';

import { hours_generator, checkTimeAvailability } from 'src/utils';

@Injectable()
export class AppointmentHandle {
  constructor(
    private readonly barbershopOpeningHourHandle: BarbershopOpeningHourHandle,
    private readonly blockedTimeHandle: BlockedTimeHandle,
    private readonly employerHandle: EmployerHandle,
    private readonly barbershopHandle: BarbershopHandle,
    private readonly appointmentRepository: AppointmentRepository,
    private readonly appointmentProductAndServiceRepository: AppointmentProductAndServiceRepository,
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
      this.appointmentProductAndServiceRepository.create({
        employer_percentage: 10,
        employer_value: 10,
        barbershop: { connect: { id: barbershop_id } },
        employer: { connect: { id: employer_id } },
        product_service: { connect: { id: item.id } },
        appointment: { connect: { id: appointment.id } },
      }),
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

  async findAppointmentToAvailable(
    barbershop_id: string,
    employer_id: string,
    date: string,
  ): Promise<FindAllPresent<AppointmentPresenter>> {
    const [data, total] = await this.appointmentRepository.findAll({
      where: {
        barbershop_id,
        employer_id,
        date,
        canceled_at: null,
      },
    });

    return {
      data,
      total,
    };
  }

  async getAvailableTimes(params: AvailableTimesDTO) {
    const {
      barbershop_id,
      barber_id,
      date,
      time_required,
      current_date,
      current_hour,
    } = params;

    let day_of_week = getISODay(new Date(date));
    // [date-fns] segunda-feira = 7 e terça-feira = 1
    // [bando de dados] domingo = 7 e segunda-feira = 1
    day_of_week = day_of_week === 7 ? 1 : day_of_week + 1;

    await Promise.all([
      this.barbershopHandle.findOneBarbershopById(barbershop_id),
      this.employerHandle.findEmployerById(barber_id),
    ]);

    const [{ data: blocked_times }, { data: appointments }, opening_hours] =
      await Promise.all([
        this.blockedTimeHandle.findBlockedTimeToAvailable(
          barbershop_id,
          day_of_week,
          date,
        ),
        this.findAppointmentToAvailable(barbershop_id, barber_id, date),
        this.barbershopOpeningHourHandle.findOneBarbershopOpeningHourByDay(
          day_of_week,
          barbershop_id,
        ),
      ]);

    const { start_hour, finish_hour } = opening_hours;
    const hours = hours_generator({ date, start_hour, finish_hour });

    const checkAvailable = hours
      .map((item) => {
        const response = checkTimeAvailability({
          date,
          item_time: item,
          close_hour: finish_hour,
          current_hour,
          current_date,
          appointments,
          blocked_times,
          time_required,
        });
        if (response === true) {
          return item;
        }
      })
      .filter((item) => item);

    const turns = {
      morning: checkAvailable.filter((h) => h < '12:00'),
      evening: checkAvailable.filter((h) => h >= '12:00' && h < '18:00'),
      night: checkAvailable.filter((h) => h >= '18:00'),
    };

    return turns;
  }
}
