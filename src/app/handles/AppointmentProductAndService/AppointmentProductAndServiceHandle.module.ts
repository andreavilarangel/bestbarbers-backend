import { Module } from '@nestjs/common';
import { RepositoriesModule } from 'src/app/repositories.module';
import { AppointmentProductAndServiceHandle } from './AppointmentProductAndService.handle';

@Module({
  imports: [RepositoriesModule],
  providers: [AppointmentProductAndServiceHandle],
  exports: [AppointmentProductAndServiceHandle],
})
export class AppointmentProductAndServiceHandleModule {}
