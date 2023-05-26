import { Module } from '@nestjs/common';
import { PaymentMethodHandleModule } from 'src/app/handles/PaymentMethod/PaymentMethodHandle.module';
import { RepositoriesModule } from 'src/app/repositories.module';
import { PaymentMethodController } from './PaymentMethod.controller';

@Module({
  imports: [RepositoriesModule, PaymentMethodHandleModule],
  controllers: [PaymentMethodController],
})
export class PaymentMethodModule {}
