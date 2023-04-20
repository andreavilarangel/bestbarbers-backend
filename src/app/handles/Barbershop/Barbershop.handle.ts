import { Injectable } from '@nestjs/common';
import {
  BarbershopCreateDTO,
  BarbershopUpdateDTO,
  BarbershopFindAllDTO,
} from 'src/app/dtos/Barbershop.dto';
import { FindAllPresent } from 'src/app/presenter/FindAll.presenter';
import { BarbershopPresenter } from 'src/app/presenter/Barbershop.presenter';
import { BarbershopCreateService } from './BarbershopCreate.service';
import { BarbershopFindService } from './BarbershopFind.service';
import { BarbershopHandleInterface } from './BarbershopHandle.interface';
import { BarbershopUpdateService } from './BarbershopUpdate.service';

@Injectable()
export class BarbershopHandle implements BarbershopHandleInterface {
  constructor(
    private readonly barbershopCreate: BarbershopCreateService,
    private readonly barbershopUpdate: BarbershopUpdateService,
    private readonly barbershopFind: BarbershopFindService,
  ) {}

  async createOneBarbershop(
    newBarbershop: BarbershopCreateDTO,
  ): Promise<BarbershopPresenter> {
    return this.barbershopCreate.createOneBarbershop(newBarbershop);
  }

  async updateOneBarbershop(
    barbershopId: string,
    dataBarbershop: BarbershopUpdateDTO,
  ): Promise<BarbershopPresenter> {
    return this.barbershopUpdate.updateOneBarbershop(
      barbershopId,
      dataBarbershop,
    );
  }

  async findOneBarbershopByUserId(
    userId: string,
  ): Promise<BarbershopPresenter> {
    return this.barbershopFind.findOneBarbershopByUserId(userId);
  }

  async findOneBarbershopById(
    barbershopId: string,
  ): Promise<BarbershopPresenter> {
    return this.barbershopFind.findOneBarbershopById(barbershopId);
  }

  async findAllBarbershop(
    params: BarbershopFindAllDTO,
  ): Promise<FindAllPresent<BarbershopPresenter>> {
    return this.barbershopFind.findAllBarbershop(params);
  }
}
