import { Injectable } from '@nestjs/common';
import { BarbershopOpeningHourFindAllDTO } from 'src/app/dtos/BarbershopOpeningHour.dto';
import { BarbershopOpeningHourPresenter } from 'src/app/presenter/BarbershopOpeningHour.presenter';
import { FindAllPresent } from 'src/app/presenter/FindAll.presenter';
import { BarbershopOpeningHourRepository } from 'src/core/repositories/BarbershopOpeningHour.repository';
import { BarbershopOpeningHourFindServiceInterface } from './BarbershopOpeningHourHandle.interface';
import {
  BarbershopOpeningHourNotFoundException,
  BarbershopOpeningHourAlreadyExistException,
} from 'src/app/errors/BarbershopOpeningHour.error';

@Injectable()
export class BarbershopOpeningHourFindService
  implements BarbershopOpeningHourFindServiceInterface
{
  constructor(
    private readonly barbershopOpeningHourRepository: BarbershopOpeningHourRepository,
  ) {}

  async findOneBarbershopOpeningHourById(
    barbershopOpeningHourId: string,
  ): Promise<BarbershopOpeningHourPresenter> {
    const barbershopOpeningHour =
      await this.barbershopOpeningHourRepository.findOne(
        barbershopOpeningHourId,
      );

    if (!barbershopOpeningHour)
      throw new BarbershopOpeningHourNotFoundException({
        barbershopOpeningHourId,
      });

    return barbershopOpeningHour;
  }

  async findOneBarbershopOpeningHourByDay(
    barbershopOpeningHourDay: string,
    barbershop_id: string,
  ): Promise<BarbershopOpeningHourPresenter> {
    const barbershopOpeningHour =
      await this.barbershopOpeningHourRepository.findByDay(
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
    const [data, total] = await this.barbershopOpeningHourRepository.findAll({
      skip: params.skip,
      take: params.take,
      where: {},
    });

    return {
      data,
      total,
    };
  }
}
