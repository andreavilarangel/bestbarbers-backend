import { Prisma } from '@prisma/client';
import { BarbershopOpeningHourEntity } from 'src/core/entities/BarbershopOpeningHour.entity';
import {
  FindAllParamsType,
  FindAllResponseType,
} from 'src/shared/interfaces/FindAll.type';

export interface BarbershopOpeningHourRepositoryInterface {
  create(
    newBarbershopOpeningHour: Prisma.BarbershopOpeningHourCreateInput,
  ): Promise<BarbershopOpeningHourEntity>;
  update(
    barbershopOpeningHourId: string,
    dataBarbershopOpeningHour: Prisma.BarbershopOpeningHourUpdateInput,
  ): Promise<BarbershopOpeningHourEntity>;
  findOne(
    barbershopOpeningHourId: string,
  ): Promise<BarbershopOpeningHourEntity>;
  findAll(
    params: FindAllParamsType<Prisma.BarbershopOpeningHourWhereInput>,
  ): Promise<FindAllResponseType<BarbershopOpeningHourEntity>>;
  delete(barbershopOpeningHourId: string): Promise<BarbershopOpeningHourEntity>;
}
