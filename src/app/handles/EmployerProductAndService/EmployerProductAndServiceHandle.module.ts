import { Module } from '@nestjs/common';
import { RepositoriesModule } from 'src/app/repositories.module';
import { EmployerProductAndServiceHandle } from './EmployerProductAndService.handle';
import { BarbershopHandle } from '../Barbershop/Barbershop.handle';
import { UserHandle } from '../User/User.handle';

@Module({
  imports: [RepositoriesModule],
  providers: [EmployerProductAndServiceHandle, BarbershopHandle, UserHandle],
  exports: [EmployerProductAndServiceHandle],
})
export class EmployerProductAndServiceHandleModule {}
