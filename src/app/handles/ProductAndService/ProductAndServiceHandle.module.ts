import { Module } from '@nestjs/common';
import { RepositoriesModule } from 'src/core/repositories/repositories.module';
import { ProductAndServiceHandle } from './ProductAndService.handle';
import { BarbershopHandle } from '../Barbershop/Barbershop.handle';
import { UserHandle } from '../User/User.handle';

@Module({
  imports: [RepositoriesModule],
  providers: [ProductAndServiceHandle, BarbershopHandle, UserHandle],
  exports: [ProductAndServiceHandle],
})
export class ProductAndServiceHandleModule {}
