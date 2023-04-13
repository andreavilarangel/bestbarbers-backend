import { Injectable } from '@nestjs/common';
import {
  PaymentMethodCreateDTO,
  PaymentMethodUpdateDTO,
  PaymentMethodFindAllDTO,
} from 'src/app/dtos/PaymentMethod.dto';
import { FindAllPresent } from 'src/app/presenter/FindAll.presenter';
import { PaymentMethodPresenter } from 'src/app/presenter/PaymentMethod.presenter';
import { PaymentMethodCreateService } from './PaymentMethodCreate.service';
import { PaymentMethodFindService } from './PaymentMethodFind.service';
import { PaymentMethodHandleInterface } from './PaymentMethodHandle.interface';
import { PaymentMethodUpdateService } from './PaymentMethodUpdate.service';

@Injectable()
export class PaymentMethodHandle implements PaymentMethodHandleInterface {
  constructor(
    private readonly paymentMethodCreate: PaymentMethodCreateService,
    private readonly paymentMethodUpdate: PaymentMethodUpdateService,
    private readonly paymentMethodFind: PaymentMethodFindService,
  ) {}

  async createOnePaymentMethod(
    newPaymentMethod: PaymentMethodCreateDTO,
  ): Promise<PaymentMethodPresenter> {
    return this.paymentMethodCreate.createOnePaymentMethod(newPaymentMethod);
  }

  async updateOnePaymentMethod(
    paymentMethodId: string,
    dataPaymentMethod: PaymentMethodUpdateDTO,
  ): Promise<PaymentMethodPresenter> {
    return this.paymentMethodUpdate.updateOnePaymentMethod(
      paymentMethodId,
      dataPaymentMethod,
    );
  }

  async findOnePaymentMethodById(
    paymentMethodId: string,
  ): Promise<PaymentMethodPresenter> {
    return this.paymentMethodFind.findOnePaymentMethodById(paymentMethodId);
  }

  async findAllPaymentMethod(
    params: PaymentMethodFindAllDTO,
  ): Promise<FindAllPresent<PaymentMethodPresenter>> {
    return this.paymentMethodFind.findAllPaymentMethod(params);
  }
}
