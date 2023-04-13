import { Injectable } from '@nestjs/common';
import { BarbershopFindAllDTO } from 'src/app/dtos/Barbershop.dto';
import { BarbershopPresenter } from 'src/app/presenter/Barbershop.presenter';
import { FindAllPresent } from 'src/app/presenter/FindAll.presenter';
import { BarbershopRepository } from 'src/core/repositories/Barbershop.repository';
import { BarbershopFindServiceInterface } from './BarbershopHandle.interface';
import { BarbershopNotFoundException } from 'src/app/errors/Barbershop.error';

@Injectable()
export class BarbershopFindService implements BarbershopFindServiceInterface {
  constructor(private readonly barbershopRepository: BarbershopRepository) {}

  async findOneBarbershopById(
    barbershopId: string,
  ): Promise<BarbershopPresenter> {
    const barbershop = await this.barbershopRepository.findOne(barbershopId);
    if (!barbershop) throw new BarbershopNotFoundException({ barbershopId });
    return barbershop;
  }

  async findAllBarbershop(
    params: BarbershopFindAllDTO,
  ): Promise<FindAllPresent<BarbershopPresenter>> {
    const [data, total] = await this.barbershopRepository.findAll({
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
