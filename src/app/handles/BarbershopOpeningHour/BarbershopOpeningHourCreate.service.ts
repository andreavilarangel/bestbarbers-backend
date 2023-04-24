import { Injectable } from '@nestjs/common';
import { omit } from 'radash';
import { BarbershopOpeningHourCreateDTO } from 'src/app/dtos/BarbershopOpeningHour.dto';
import { BarbershopOpeningHourPresenter } from 'src/app/presenter/BarbershopOpeningHour.presenter';
import { BarbershopOpeningHourRepository } from 'src/core/repositories/BarbershopOpeningHour.repository';
import { BarbershopOpeningHourCreateServiceInterface } from './BarbershopOpeningHourHandle.interface';
import { BarbershopOpeningHourFindService } from './BarbershopOpeningHourFind.service';
import { BarbershopFindService } from '../Barbershop/BarbershopFind.service';

@Injectable()
export class BarbershopOpeningHourCreateService
  implements BarbershopOpeningHourCreateServiceInterface
{
  constructor(
    private readonly barbershopOpeningHourRepository: BarbershopOpeningHourRepository,
    private readonly barbershopOpeningHourFind: BarbershopOpeningHourFindService,
    private readonly barbershopFindService: BarbershopFindService,
  ) {}

  async createOneBarbershopOpeningHour(
    newBarbershopOpeningHour: BarbershopOpeningHourCreateDTO,
  ): Promise<BarbershopOpeningHourPresenter> {
    const { barbershop_id, day } = newBarbershopOpeningHour;
    await this.barbershopFindService.findOneBarbershopById(barbershop_id);
    await this.barbershopOpeningHourFind.findOneBarbershopOpeningHourByDay(
      day,
      barbershop_id,
    );

    return this.barbershopOpeningHourRepository.create({
      ...omit(newBarbershopOpeningHour, ['barbershop_id']),
      barbershop: { connect: { id: barbershop_id } },
    });
  }

  async createAllBarbershopOpeningHour(
    newBarbershopOpeningHour: BarbershopOpeningHourCreateDTO,
  ): Promise<any> {
    const { barbershop_id } = newBarbershopOpeningHour;
    await this.barbershopFindService.findOneBarbershopById(barbershop_id);

    const days = [
      { day: 1, day_reference: 'monday' },
      { day: 2, day_reference: 'tuesday' },
      { day: 3, day_reference: 'wednesday' },
      { day: 4, day_reference: 'thursday' },
      { day: 5, day_reference: 'friday' },
      { day: 6, day_reference: 'saturday' },
      { day: 7, day_reference: 'sunday' },
    ];
    const created = days.map((item) => {
      return this.barbershopOpeningHourRepository.create({
        ...item,
        barbershop: { connect: { id: barbershop_id } },
      });
    });

    return created;
  }
}
