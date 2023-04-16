import { Prisma } from '@prisma/client';
import { AddressEntity } from 'src/core/entities/Address.entity';
import {
  FindAllParamsType,
  FindAllResponseType,
} from 'src/shared/interfaces/FindAll.type';

export interface AddressRepositoryInterface {
  create(newAddress: Prisma.AddressCreateInput): Promise<AddressEntity>;
  update(
    addressId: string,
    dataAddress: Prisma.AddressUpdateInput,
  ): Promise<AddressEntity>;
  findOne(addressId: string): Promise<AddressEntity>;
  findAll(
    params: FindAllParamsType<Prisma.AddressWhereInput>,
  ): Promise<FindAllResponseType<AddressEntity>>;
  delete(addressId: string): Promise<AddressEntity>;
}
