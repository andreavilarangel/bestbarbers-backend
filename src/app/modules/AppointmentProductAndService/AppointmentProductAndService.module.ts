import { Module } from '@nestjs/common';
import { AppointmentProductAndServiceHandleModule } from 'src/app/handles/AppointmentProductAndService/AppointmentProductAndServiceHandle.module';
import { RepositoriesModule } from 'src/app/repositories.module';
import { AppointmentProductAndServiceController } from './AppointmentProductAndService.controller';

@Module({
  imports: [RepositoriesModule, AppointmentProductAndServiceHandleModule],
  controllers: [AppointmentProductAndServiceController],
})
export class AppointmentProductAndServiceModule {}
