import { Module } from '@nestjs/common';
import { AppointmentHandleModule } from 'src/app/handles/Appointment/AppointmentHandle.module';
import { RepositoriesModule } from 'src/app/repositories.module';
import { AppointmentController } from './Appointment.controller';

@Module({
  imports: [RepositoriesModule, AppointmentHandleModule],
  controllers: [AppointmentController],
})
export class AppointmentModule {}
