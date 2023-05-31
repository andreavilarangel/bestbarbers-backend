import { Injectable } from '@nestjs/common';
import { omit } from 'radash';
import {
  PaymentMethodCreateDTO,
  PaymentMethodUpdateDTO,
} from 'src/app/modules/PaymentMethod/PaymentMethod.dto';
import { FindAllPresent } from 'src/shared/FindAll.presenter';
import { PaymentMethodPresenter } from 'src/app/modules/PaymentMethod/PaymentMethod.presenter';

import { BarbershopHandle } from '../Barbershop/Barbershop.handle';
import { PaymentMethodRepository } from 'src/app/modules/PaymentMethod/PaymentMethod.repository';
import { PaymentMethodNotFoundException } from 'src/app/modules/PaymentMethod/PaymentMethod.error';

@Injectable()
export class PaymentMethodHandle {
  constructor(
    private readonly barbershopHandle: BarbershopHandle,
    private readonly paymentMethodRepository: PaymentMethodRepository,
  ) {}

  async createOnePaymentMethod(
    newPaymentMethod: PaymentMethodCreateDTO,
  ): Promise<PaymentMethodPresenter> {
    const { barbershop_id } = newPaymentMethod;
    await this.barbershopHandle.findOneBarbershopById(barbershop_id);

    return this.paymentMethodRepository.create({
      ...omit(newPaymentMethod, ['barbershop_id']),
      barbershop: { connect: { id: barbershop_id } },
    });
  }

  async updateOnePaymentMethod(
    paymentMethodId: string,
    dataPaymentMethod: PaymentMethodUpdateDTO,
  ): Promise<PaymentMethodPresenter> {
    // valida se existe PaymentMethod
    await this.findOnePaymentMethodById(paymentMethodId);

    return this.paymentMethodRepository.update(
      paymentMethodId,
      dataPaymentMethod,
    );
  }

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

  async findBarbershopPaymentMethods(
    barbershop_id: string,
  ): Promise<FindAllPresent<PaymentMethodPresenter>> {
    const [data, total] = await this.paymentMethodRepository.findAll({
      where: { barbershop_id, inactive: false },
    });

    return {
      data,
      total,
    };
  }

  async deleteOnePaymentMethod(
    paymentMethodId: string,
  ): Promise<PaymentMethodPresenter> {
    // valida se existe PaymentMethod
    await this.findOnePaymentMethodById(paymentMethodId);

    return this.paymentMethodRepository.update(paymentMethodId, {
      inactive: true,
    });
  }
}
