import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/infrastructure/database/prisma/prisma.service';
import {
  FindAllParamsType,
  FindAllResponseType,
} from 'src/shared/interfaces/FindAll.type';
import { PaymentMethodEntity } from './PaymentMethod.entity';

@Injectable()
export class PaymentMethodRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(
    newPaymentMethod: Prisma.PaymentMethodCreateInput,
  ): Promise<PaymentMethodEntity> {
    return this.prisma.paymentMethod.create({
      data: newPaymentMethod,
    });
  }

  async update(
    paymentMethodId: string,
    dataPaymentMethod: Prisma.PaymentMethodUpdateInput,
  ): Promise<PaymentMethodEntity> {
    return this.prisma.paymentMethod.update({
      where: {
        id: paymentMethodId,
      },
      data: dataPaymentMethod,
    });
  }

  async findOne(paymentMethodId: string): Promise<PaymentMethodEntity> {
    return this.prisma.paymentMethod.findUnique({
      where: {
        id: paymentMethodId,
      },
    });
  }

  async findAll(
    params: FindAllParamsType<Prisma.PaymentMethodWhereInput>,
  ): Promise<FindAllResponseType<PaymentMethodEntity>> {
    return this.prisma.$transaction([
      this.prisma.paymentMethod.findMany({
        skip: params.skip,
        take: params.take,
        where: params.where,
      }),
      this.prisma.paymentMethod.count({ where: params.where }),
    ]);
  }

  async delete(paymentMethodId: string): Promise<PaymentMethodEntity> {
    return this.prisma.paymentMethod.delete({
      where: {
        id: paymentMethodId,
      },
    });
  }
}
