import { Injectable } from '@nestjs/common';
import { omit } from 'radash';
import { PaymentMethodCreateDTO } from 'src/app/dtos/PaymentMethod.dto';
import { PaymentMethodPresenter } from 'src/app/presenter/PaymentMethod.presenter';
import { PaymentMethodRepository } from 'src/core/repositories/PaymentMethod.repository';
import { PaymentMethodCreateServiceInterface } from './PaymentMethodHandle.interface';
import { BarbershopFindService } from '../Barbershop/BarbershopFind.service';

@Injectable()
export class PaymentMethodCreateService
  implements PaymentMethodCreateServiceInterface
{
  constructor(
    private readonly paymentMethodRepository: PaymentMethodRepository,
    private readonly barbershopFindService: BarbershopFindService,
  ) {}

  async createOnePaymentMethod(
    newPaymentMethod: PaymentMethodCreateDTO,
  ): Promise<PaymentMethodPresenter> {
    const { barbershop_id } = newPaymentMethod;
    await this.barbershopFindService.findOneBarbershopById(barbershop_id);

    return this.paymentMethodRepository.create({
      ...omit(newPaymentMethod, ['barbershop_id']),
      barbershop: { connect: { id: barbershop_id } },
    });
  }
}
