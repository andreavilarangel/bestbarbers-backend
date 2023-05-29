import { Module } from '@nestjs/common';
import { RepositoriesModule } from 'src/app/repositories.module';
import { AppointmentHandle } from './Appointment.handle';
import { AppointmentProductAndServiceHandle } from '../AppointmentProductAndService/AppointmentProductAndService.handle';

@Module({
  imports: [RepositoriesModule],
  providers: [AppointmentHandle, AppointmentProductAndServiceHandle],
  exports: [AppointmentHandle],
})
export class AppointmentHandleModule {}
