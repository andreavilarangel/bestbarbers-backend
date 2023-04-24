import { Injectable } from '@nestjs/common';
import {
  BarbershopOpeningHourCreateDTO,
  BarbershopOpeningHourUpdateDTO,
  BarbershopOpeningHourFindAllDTO,
} from 'src/app/dtos/BarbershopOpeningHour.dto';
import { FindAllPresent } from 'src/app/presenter/FindAll.presenter';
import { BarbershopOpeningHourPresenter } from 'src/app/presenter/BarbershopOpeningHour.presenter';
import { BarbershopOpeningHourCreateService } from './BarbershopOpeningHourCreate.service';
import { BarbershopOpeningHourFindService } from './BarbershopOpeningHourFind.service';
import { BarbershopOpeningHourHandleInterface } from './BarbershopOpeningHourHandle.interface';
import { BarbershopOpeningHourUpdateService } from './BarbershopOpeningHourUpdate.service';

@Injectable()
export class BarbershopOpeningHourHandle
  implements BarbershopOpeningHourHandleInterface
{
  constructor(
    private readonly barbershopOpeningHourCreate: BarbershopOpeningHourCreateService,
    private readonly barbershopOpeningHourUpdate: BarbershopOpeningHourUpdateService,
    private readonly barbershopOpeningHourFind: BarbershopOpeningHourFindService,
  ) {}

  async createOneBarbershopOpeningHour(
    newBarbershopOpeningHour: BarbershopOpeningHourCreateDTO,
  ): Promise<BarbershopOpeningHourPresenter> {
    return this.barbershopOpeningHourCreate.createOneBarbershopOpeningHour(
      newBarbershopOpeningHour,
    );
  }

  async updateOneBarbershopOpeningHour(
    barbershopOpeningHourId: string,
    dataBarbershopOpeningHour: BarbershopOpeningHourUpdateDTO,
  ): Promise<BarbershopOpeningHourPresenter> {
    return this.barbershopOpeningHourUpdate.updateOneBarbershopOpeningHour(
      barbershopOpeningHourId,
      dataBarbershopOpeningHour,
    );
  }

  async updateAllBarbershopOpeningHour(data: any): Promise<any> {
    return this.barbershopOpeningHourUpdate.updateAllBarbershopOpeningHour(
      data,
    );
  }

  async findOneBarbershopOpeningHourById(
    barbershopOpeningHourId: string,
  ): Promise<BarbershopOpeningHourPresenter> {
    return this.barbershopOpeningHourFind.findOneBarbershopOpeningHourById(
      barbershopOpeningHourId,
    );
  }

  async findAllBarbershopOpeningHour(
    params: BarbershopOpeningHourFindAllDTO,
  ): Promise<FindAllPresent<BarbershopOpeningHourPresenter>> {
    return this.barbershopOpeningHourFind.findAllBarbershopOpeningHour(params);
  }
}
