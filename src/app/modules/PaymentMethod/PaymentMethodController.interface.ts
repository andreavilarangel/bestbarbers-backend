import {
  PaymentMethodCreateDTO,
  PaymentMethodUpdateDTO,
  PaymentMethodFindAllDTO,
} from 'src/app/dtos/PaymentMethod.dto';
import { PaymentMethodPresenter } from 'src/app/presenter/PaymentMethod.presenter';
import { FindAllPresent } from 'src/app/presenter/FindAll.presenter';

export interface PaymentMethodControllerInterface {
  createOnePaymentMethod(
    newPaymentMethod: PaymentMethodCreateDTO,
  ): Promise<PaymentMethodPresenter>;
  updateOnePaymentMethod(
    paymentMethodId: string,
    dataPaymentMethod: PaymentMethodUpdateDTO,
  ): Promise<PaymentMethodPresenter>;
  getOnePaymentMethodById(
    paymentMethodId: string,
  ): Promise<PaymentMethodPresenter>;
  getAllPaymentMethod(
    queries: PaymentMethodFindAllDTO,
  ): Promise<FindAllPresent<PaymentMethodPresenter>>;
}
