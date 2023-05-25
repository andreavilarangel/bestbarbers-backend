import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/infrastructure/database/prisma/prisma.service';
import {
  FindAllParamsType,
  FindAllResponseType,
} from 'src/shared/interfaces/FindAll.type';
import { ProductAndServiceEntity } from './ProductAndService.entity';

@Injectable()
export class ProductAndServiceRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(
    newProductAndService: Prisma.ProductAndServiceCreateInput,
  ): Promise<ProductAndServiceEntity> {
    return this.prisma.productAndService.create({
      data: newProductAndService,
    });
  }

  async update(
    productAndServiceId: string,
    dataProductAndService: Prisma.ProductAndServiceUpdateInput,
  ): Promise<ProductAndServiceEntity> {
    return this.prisma.productAndService.update({
      where: {
        id: productAndServiceId,
      },
      data: dataProductAndService,
    });
  }

  async findOne(productAndServiceId: string): Promise<ProductAndServiceEntity> {
    return this.prisma.productAndService.findUnique({
      where: {
        id: productAndServiceId,
      },
    });
  }

  async findAll(
    params: FindAllParamsType<Prisma.ProductAndServiceWhereInput>,
  ): Promise<FindAllResponseType<ProductAndServiceEntity>> {
    return this.prisma.$transaction([
      this.prisma.productAndService.findMany({
        skip: params.skip,
        take: params.take,
        where: params.where,
      }),
      this.prisma.productAndService.count({ where: params.where }),
    ]);
  }

  async delete(productAndServiceId: string): Promise<ProductAndServiceEntity> {
    return this.prisma.productAndService.delete({
      where: {
        id: productAndServiceId,
      },
    });
  }
}
