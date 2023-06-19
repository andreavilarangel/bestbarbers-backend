import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/infrastructure/database/prisma/prisma.service';
import {
  FindAllParamsType,
  FindAllResponseType,
} from 'src/shared/FindAll.type';
import { ProductEntity } from './Product.entity';

@Injectable()
export class ProductRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(newProduct: Prisma.ProductCreateInput): Promise<ProductEntity> {
    return this.prisma.product.create({
      data: newProduct,
    });
  }

  async update(
    productId: string,
    dataProduct: Prisma.ProductUpdateInput,
  ): Promise<ProductEntity> {
    return this.prisma.product.update({
      where: {
        id: productId,
      },
      data: dataProduct,
    });
  }

  async findOne(productId: string): Promise<ProductEntity> {
    return this.prisma.product.findUnique({
      where: {
        id: productId,
      },
    });
  }

  async findAll(
    params: FindAllParamsType<Prisma.ProductWhereInput>,
  ): Promise<FindAllResponseType<ProductEntity>> {
    return this.prisma.$transaction([
      this.prisma.product.findMany({
        skip: params.skip,
        take: params.take,
        where: params.where,
      }),
      this.prisma.product.count({ where: params.where }),
    ]);
  }

  async delete(productId: string): Promise<ProductEntity> {
    return this.prisma.product.delete({
      where: {
        id: productId,
      },
    });
  }
}
