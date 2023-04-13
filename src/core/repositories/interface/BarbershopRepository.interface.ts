import { Prisma } from '@prisma/client';
import { BarbershopEntity } from 'src/core/entities/Barbershop.entity';
import {
  FindAllParamsType,
  FindAllResponseType,
} from 'src/shared/interfaces/FindAll.type';

export interface BarbershopRepositoryInterface {
  create(
    newBarbershop: Prisma.BarbershopCreateInput,
  ): Promise<BarbershopEntity>;
  update(
    barbershopId: string,
    dataBarbershop: Prisma.BarbershopUpdateInput,
  ): Promise<BarbershopEntity>;
  findByUserId(user_id: string): Promise<BarbershopEntity>;
  findOne(barbershopId: string): Promise<BarbershopEntity>;
  findAll(
    params: FindAllParamsType<Prisma.BarbershopWhereInput>,
  ): Promise<FindAllResponseType<BarbershopEntity>>;
  delete(barbershopId: string): Promise<BarbershopEntity>;
}
