import { Module } from '@nestjs/common';
import { RepositoriesModule } from 'src/app/repositories.module';
import { ProductHandle } from './Product.handle';
import { BarbershopHandle } from '../Barbershop/Barbershop.handle';
import { UserHandle } from '../User/User.handle';

@Module({
  imports: [RepositoriesModule],
  providers: [ProductHandle, BarbershopHandle, UserHandle],
  exports: [ProductHandle],
})
export class ProductHandleModule {}
