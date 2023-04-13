import { Injectable } from '@nestjs/common';
import { PaymentMethodUpdateDTO } from 'src/app/dtos/PaymentMethod.dto';
import { PaymentMethodPresenter } from 'src/app/presenter/PaymentMethod.presenter';
import { PaymentMethodRepository } from 'src/core/repositories/PaymentMethod.repository';
import { PaymentMethodFindService } from './PaymentMethodFind.service';
import { PaymentMethodUpdateServiceInterface } from './PaymentMethodHandle.interface';

@Injectable()
export class PaymentMethodUpdateService
  implements PaymentMethodUpdateServiceInterface
{
  constructor(
    private readonly paymentMethodRepository: PaymentMethodRepository,
    private readonly paymentMethodFindService: PaymentMethodFindService,
  ) {}

  async updateOnePaymentMethod(
    paymentMethodId: string,
    dataPaymentMethod: PaymentMethodUpdateDTO,
  ): Promise<PaymentMethodPresenter> {
    // valida se existe PaymentMethod
    await this.paymentMethodFindService.findOnePaymentMethodById(
      paymentMethodId,
    );

    return this.paymentMethodRepository.update(
      paymentMethodId,
      dataPaymentMethod,
    );
  }
}
