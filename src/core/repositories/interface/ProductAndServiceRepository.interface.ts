import { Prisma } from '@prisma/client';
import { ProductAndServiceEntity } from 'src/app/modules/ProductAndService/ProductAndService.entity';
import {
  FindAllParamsType,
  FindAllResponseType,
} from 'src/shared/interfaces/FindAll.type';

export interface ProductAndServiceRepositoryInterface {
  create(
    newProductAndService: Prisma.ProductAndServiceCreateInput,
  ): Promise<ProductAndServiceEntity>;
  update(
    productAndServiceId: string,
    dataProductAndService: Prisma.ProductAndServiceUpdateInput,
  ): Promise<ProductAndServiceEntity>;
  findOne(productAndServiceId: string): Promise<ProductAndServiceEntity>;
  findAll(
    params: FindAllParamsType<Prisma.ProductAndServiceWhereInput>,
  ): Promise<FindAllResponseType<ProductAndServiceEntity>>;
  delete(productAndServiceId: string): Promise<ProductAndServiceEntity>;
}
