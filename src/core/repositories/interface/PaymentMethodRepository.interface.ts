import { Prisma } from '@prisma/client'
import { PaymentMethodEntity } from 'src/core/entities/PaymentMethod.entity'
import {
  FindAllParamsType,
  FindAllResponseType,
} from 'src/shared/interfaces/FindAll.type'

export interface PaymentMethodRepositoryInterface {
  create(newPaymentMethod: Prisma.PaymentMethodCreateInput): Promise<PaymentMethodEntity>
  update(
    paymentMethodId: string,
    dataPaymentMethod: Prisma.PaymentMethodUpdateInput,
  ): Promise<PaymentMethodEntity>
  findOne(paymentMethodId: string): Promise<PaymentMethodEntity>
  findAll(
    params: FindAllParamsType<Prisma.PaymentMethodWhereInput>,
  ): Promise<FindAllResponseType<PaymentMethodEntity>>
  delete(paymentMethodId: string): Promise<PaymentMethodEntity>
}
