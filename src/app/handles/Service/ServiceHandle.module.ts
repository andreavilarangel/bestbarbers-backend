import { Module } from '@nestjs/common';
import { RepositoriesModule } from 'src/app/repositories.module';
import { ServiceHandle } from './Service.handle';
import { BarbershopHandle } from '../Barbershop/Barbershop.handle';
import { UserHandle } from '../User/User.handle';

@Module({
  imports: [RepositoriesModule],
  providers: [ServiceHandle, BarbershopHandle, UserHandle],
  exports: [ServiceHandle],
})
export class ServiceHandleModule {}
