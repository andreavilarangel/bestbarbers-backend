import { Injectable } from '@nestjs/common';
import { omit } from 'radash';
import {
  BarbershopOpeningHourCreateDTO,
  BarbershopOpeningHourUpdateDTO,
  BarbershopOpeningHourFindAllDTO,
} from 'src/app/dtos/BarbershopOpeningHour.dto';
import { FindAllPresent } from 'src/shared/FindAll.presenter';
import { BarbershopOpeningHourPresenter } from 'src/app/modules/BarbershopOpeningHour/BarbershopOpeningHour.presenter';

import { BarbershopOpeningHourRepository } from 'src/app/modules/BarbershopOpeningHour/BarbershopOpeningHour.repository';

import {
  BarbershopOpeningHourNotFoundException,
  BarbershopOpeningHourAlreadyExistException,
} from 'src/app/errors/BarbershopOpeningHour.error';

import { BarbershopHandle } from '../Barbershop/Barbershop.handle';

@Injectable()
export class BarbershopOpeningHourHandle {
  constructor(
    private readonly barbershopOpeningHourHandle: BarbershopOpeningHourRepository,
    private readonly barbershopHandle: BarbershopHandle,
  ) {}

  async createOneBarbershopOpeningHour(
    newBarbershopOpeningHour: BarbershopOpeningHourCreateDTO,
  ): Promise<BarbershopOpeningHourPresenter> {
    const { barbershop_id, day } = newBarbershopOpeningHour;
    await this.barbershopHandle.findOneBarbershopById(barbershop_id);
    await this.findOneBarbershopOpeningHourByDay(day, barbershop_id);

    return this.barbershopOpeningHourHandle.create({
      ...omit(newBarbershopOpeningHour, ['barbershop_id']),
      barbershop: { connect: { id: barbershop_id } },
    });
  }

  async updateOneBarbershopOpeningHour(
    barbershopOpeningHourId: string,
    dataBarbershopOpeningHour: BarbershopOpeningHourUpdateDTO,
  ): Promise<BarbershopOpeningHourPresenter> {
    // valida se existe BarbershopOpeningHour
    await this.findOneBarbershopOpeningHourById(barbershopOpeningHourId);

    return this.barbershopOpeningHourHandle.update(
      barbershopOpeningHourId,
      dataBarbershopOpeningHour,
    );
  }

  async updateAllBarbershopOpeningHour(data: any): Promise<any> {
    return this.barbershopOpeningHourHandle.updateMany(data);
  }

  async findOneBarbershopOpeningHourById(
    barbershopOpeningHourId: string,
  ): Promise<BarbershopOpeningHourPresenter> {
    const barbershopOpeningHour =
      await this.barbershopOpeningHourHandle.findOne(barbershopOpeningHourId);

    if (!barbershopOpeningHour)
      throw new BarbershopOpeningHourNotFoundException({
        barbershopOpeningHourId,
      });

    return barbershopOpeningHour;
  }

  async findOneBarbershopOpeningHourByDay(
    barbershopOpeningHourDay: number,
    barbershop_id: string,
  ): Promise<BarbershopOpeningHourPresenter> {
    const barbershopOpeningHour =
      await this.barbershopOpeningHourHandle.findByDay(
        barbershopOpeningHourDay,
        barbershop_id,
      );

    if (barbershopOpeningHour)
      throw new BarbershopOpeningHourAlreadyExistException({
        barbershopOpeningHourDay,
      });

    return barbershopOpeningHour;
  }

  async findAllBarbershopOpeningHour(
    params: BarbershopOpeningHourFindAllDTO,
  ): Promise<FindAllPresent<BarbershopOpeningHourPresenter>> {
    const [data, total] = await this.barbershopOpeningHourHandle.findAll({
      skip: params.skip,
      take: params.take,
      where: {
        barbershop_id: params.barbershop_id,
      },
    });

    return {
      data,
      total,
    };
  }
}
