import { Injectable } from '@nestjs/common';
import { BarbershopOpeningHourUpdateDTO } from 'src/app/dtos/BarbershopOpeningHour.dto';
import { BarbershopOpeningHourPresenter } from 'src/app/presenter/BarbershopOpeningHour.presenter';
import { BarbershopOpeningHourRepository } from 'src/core/repositories/BarbershopOpeningHour.repository';
import { BarbershopOpeningHourFindService } from './BarbershopOpeningHourFind.service';
import { BarbershopOpeningHourUpdateServiceInterface } from './BarbershopOpeningHourHandle.interface';

@Injectable()
export class BarbershopOpeningHourUpdateService
  implements BarbershopOpeningHourUpdateServiceInterface
{
  constructor(
    private readonly barbershopOpeningHourRepository: BarbershopOpeningHourRepository,
    private readonly barbershopOpeningHourFindService: BarbershopOpeningHourFindService,
  ) {}

  async updateOneBarbershopOpeningHour(
    barbershopOpeningHourId: string,
    dataBarbershopOpeningHour: BarbershopOpeningHourUpdateDTO,
  ): Promise<BarbershopOpeningHourPresenter> {
    // valida se existe BarbershopOpeningHour
    await this.barbershopOpeningHourFindService.findOneBarbershopOpeningHourById(
      barbershopOpeningHourId,
    );

    return this.barbershopOpeningHourRepository.update(
      barbershopOpeningHourId,
      dataBarbershopOpeningHour,
    );
  }
}
