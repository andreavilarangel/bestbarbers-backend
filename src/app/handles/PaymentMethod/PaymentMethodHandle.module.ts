import { Module } from '@nestjs/common';
import { RepositoriesModule } from 'src/app/repositories.module';
import { PaymentMethodHandle } from './PaymentMethod.handle';
import { BarbershopHandle } from '../Barbershop/Barbershop.handle';
import { UserHandle } from '../User/User.handle';

@Module({
  imports: [RepositoriesModule],
  providers: [PaymentMethodHandle, BarbershopHandle, UserHandle],
  exports: [PaymentMethodHandle],
})
export class PaymentMethodHandleModule {}
