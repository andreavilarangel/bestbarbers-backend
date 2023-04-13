import { Module } from '@nestjs/common';
import { RepositoriesModule } from 'src/core/repositories/repositories.module';
import { PaymentMethodHandle } from './PaymentMethod.handle';
import { PaymentMethodCreateService } from './PaymentMethodCreate.service';
import { PaymentMethodFindService } from './PaymentMethodFind.service';
import { PaymentMethodUpdateService } from './PaymentMethodUpdate.service';
import { BarbershopFindService } from '../Barbershop/BarbershopFind.service';

@Module({
  imports: [RepositoriesModule],
  providers: [
    PaymentMethodHandle,
    PaymentMethodCreateService,
    PaymentMethodUpdateService,
    PaymentMethodFindService,
    BarbershopFindService,
  ],
  exports: [
    PaymentMethodHandle,
    PaymentMethodCreateService,
    PaymentMethodUpdateService,
    PaymentMethodFindService,
  ],
})
export class PaymentMethodHandleModule {}
