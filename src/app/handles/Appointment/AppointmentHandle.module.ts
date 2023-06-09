import { Module } from '@nestjs/common';
import { RepositoriesModule } from 'src/app/repositories.module';
import { AppointmentHandle } from './Appointment.handle';
import { BarbershopHandle } from '../Barbershop/Barbershop.handle';
import { EmployerHandle } from '../Employer/Employer.handle';
import { BlockedTimeHandle } from '../BlockedTime/BlockedTime.handle';
import { UserHandle } from '../User/User.handle';
import { BarbershopOpeningHourHandle } from '../BarbershopOpeningHour/BarbershopOpeningHour.handle';

@Module({
  imports: [RepositoriesModule],
  providers: [
    AppointmentHandle,
    BarbershopHandle,
    EmployerHandle,
    BlockedTimeHandle,
    UserHandle,
    BarbershopOpeningHourHandle,
  ],
  exports: [AppointmentHandle],
})
export class AppointmentHandleModule {}
