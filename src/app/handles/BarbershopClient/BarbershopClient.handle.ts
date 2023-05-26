import { Injectable } from '@nestjs/common';
import {
  BarbershopClientCreateDTO,
  BarbershopClientUpdateDTO,
  BarbershopClientFindAllDTO,
} from 'src/app/dtos/BarbershopClient.dto';
import { FindAllPresent } from 'src/shared/FindAll.presenter';
import { BarbershopClientPresenter } from 'src/app/modules/BarbershopClient/BarbershopClient.presenter';
import { BarbershopClientRepository } from 'src/app/modules/BarbershopClient/BarbershopClient.repository';

@Injectable()
export class BarbershopClientHandle {
  constructor(
    private readonly barbershopClientRepository: BarbershopClientRepository,
  ) {}

  async createOneBarbershopClient(
    newBarbershopClient: BarbershopClientCreateDTO,
  ): Promise<BarbershopClientPresenter> {
    return this.barbershopClientRepository.create(newBarbershopClient);
  }

  async updateOneBarbershopClient(
    barbershopClientId: string,
    dataBarbershopClient: BarbershopClientUpdateDTO,
  ): Promise<BarbershopClientPresenter> {
    return this.barbershopClientRepository.update(
      barbershopClientId,
      dataBarbershopClient,
    );
  }

  async findOneBarbershopClientById(
    barbershopClientId: string,
  ): Promise<BarbershopClientPresenter> {
    return this.barbershopClientRepository.findOne(barbershopClientId);
  }

  async findAllBarbershopClient(
    params: BarbershopClientFindAllDTO,
  ): Promise<FindAllPresent<BarbershopClientPresenter>> {
    return this.barbershopClientRepository.findAll(params);
  }
}
