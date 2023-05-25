import { Module } from '@nestjs/common';
import { RepositoriesModule } from 'src/core/repositories/repositories.module';
import { BarbershopOpeningHourHandle } from './BarbershopOpeningHour.handle';
import { BarbershopHandle } from '../Barbershop/Barbershop.handle';
import { UserHandle } from '../User/User.handle';

@Module({
  imports: [RepositoriesModule],
  providers: [BarbershopOpeningHourHandle, BarbershopHandle, UserHandle],
  exports: [BarbershopOpeningHourHandle],
})
export class BarbershopOpeningHourHandleModule {}
