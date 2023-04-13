import {
  PaymentMethodCreateDTO,
  PaymentMethodUpdateDTO,
  PaymentMethodFindAllDTO,
} from 'src/app/dtos/PaymentMethod.dto';
import { FindAllPresent } from 'src/app/presenter/FindAll.presenter';
import { PaymentMethodPresenter } from 'src/app/presenter/PaymentMethod.presenter';

export interface PaymentMethodCreateServiceInterface {
  createOnePaymentMethod(
    newPaymentMethod: PaymentMethodCreateDTO,
  ): Promise<PaymentMethodPresenter>;
}

export interface PaymentMethodUpdateServiceInterface {
  updateOnePaymentMethod(
    paymentMethodId: string,
    dataPaymentMethod: PaymentMethodUpdateDTO,
  ): Promise<PaymentMethodPresenter>;
}

export interface PaymentMethodFindServiceInterface {
  findOnePaymentMethodById(
    paymentMethodId: string,
  ): Promise<PaymentMethodPresenter>;
  findAllPaymentMethod(
    params: PaymentMethodFindAllDTO,
  ): Promise<FindAllPresent<PaymentMethodPresenter>>;
}

export interface PaymentMethodHandleInterface
  extends PaymentMethodCreateServiceInterface,
    PaymentMethodUpdateServiceInterface,
    PaymentMethodFindServiceInterface {}
