import { Module } from '@nestjs/common';
import { RepositoriesModule } from 'src/app/repositories.module';
import { AppointmentHandle } from './Appointment.handle';

@Module({
  imports: [RepositoriesModule],
  providers: [AppointmentHandle],
  exports: [AppointmentHandle],
})
export class AppointmentHandleModule {}
