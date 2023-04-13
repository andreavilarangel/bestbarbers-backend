import { Injectable } from '@nestjs/common';
import { PaymentMethodFindAllDTO } from 'src/app/dtos/PaymentMethod.dto';
import { PaymentMethodPresenter } from 'src/app/presenter/PaymentMethod.presenter';
import { FindAllPresent } from 'src/app/presenter/FindAll.presenter';
import { PaymentMethodRepository } from 'src/core/repositories/PaymentMethod.repository';
import { PaymentMethodFindServiceInterface } from './PaymentMethodHandle.interface';
import { PaymentMethodNotFoundException } from 'src/app/errors/PaymentMethod.error';

@Injectable()
export class PaymentMethodFindService
  implements PaymentMethodFindServiceInterface
{
  constructor(
    private readonly paymentMethodRepository: PaymentMethodRepository,
  ) {}

  async findOnePaymentMethodById(
    paymentMethodId: string,
  ): Promise<PaymentMethodPresenter> {
    const paymentMethod = await this.paymentMethodRepository.findOne(
      paymentMethodId,
    );

    if (!paymentMethod)
      throw new PaymentMethodNotFoundException({ paymentMethodId });

    return paymentMethod;
  }

  async findAllPaymentMethod(
    params: PaymentMethodFindAllDTO,
  ): Promise<FindAllPresent<PaymentMethodPresenter>> {
    const [data, total] = await this.paymentMethodRepository.findAll({
      skip: params.skip,
      take: params.take,
      where: {},
    });

    return {
      data,
      total,
    };
  }
}
