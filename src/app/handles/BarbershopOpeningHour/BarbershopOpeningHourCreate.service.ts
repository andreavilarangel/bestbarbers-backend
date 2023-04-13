import { Injectable } from '@nestjs/common';
import { omit } from 'radash';
import { BarbershopOpeningHourCreateDTO } from 'src/app/dtos/BarbershopOpeningHour.dto';
import { BarbershopOpeningHourPresenter } from 'src/app/presenter/BarbershopOpeningHour.presenter';
import { BarbershopOpeningHourRepository } from 'src/core/repositories/BarbershopOpeningHour.repository';
import { BarbershopOpeningHourCreateServiceInterface } from './BarbershopOpeningHourHandle.interface';
import { BarbershopOpeningHourFindService } from './BarbershopOpeningHourFind.service';

@Injectable()
export class BarbershopOpeningHourCreateService
  implements BarbershopOpeningHourCreateServiceInterface
{
  constructor(
    private readonly barbershopOpeningHourRepository: BarbershopOpeningHourRepository,
    private readonly barbershopOpeningHourFind: BarbershopOpeningHourFindService,
  ) {}

  async createOneBarbershopOpeningHour(
    newBarbershopOpeningHour: BarbershopOpeningHourCreateDTO,
  ): Promise<BarbershopOpeningHourPresenter> {
    const { barbershop_id, day } = newBarbershopOpeningHour;
    await this.barbershopOpeningHourFind.findOneBarbershopOpeningHourByDay(
      day,
      barbershop_id,
    );

    return this.barbershopOpeningHourRepository.create({
      ...omit(newBarbershopOpeningHour, ['barbershop_id']),
      barbershop: { connect: { id: barbershop_id } },
    });
  }
}
