import { Injectable } from '@nestjs/common';
import {
  ClientCreateDTO,
  ClientUpdateDTO,
  ClientFindAllDTO,
} from 'src/app/dtos/Client.dto';
import { FindAllPresent } from 'src/app/presenter/FindAll.presenter';
import { ClientPresenter } from 'src/app/presenter/Client.presenter';
import { ClientCreateService } from './ClientCreate.service';
import { ClientFindService } from './ClientFind.service';
import { ClientHandleInterface } from './ClientHandle.interface';
import { ClientUpdateService } from './ClientUpdate.service';

@Injectable()
export class ClientHandle implements ClientHandleInterface {
  constructor(
    private readonly clientCreate: ClientCreateService,
    private readonly clientUpdate: ClientUpdateService,
    private readonly clientFind: ClientFindService,
  ) {}

  async createOneClient(newClient: ClientCreateDTO): Promise<ClientPresenter> {
    return this.clientCreate.createOneClient(newClient);
  }

  async updateOneClient(
    clientId: string,
    dataClient: ClientUpdateDTO,
  ): Promise<ClientPresenter> {
    return this.clientUpdate.updateOneClient(clientId, dataClient);
  }

  async findOneClientById(clientId: string): Promise<ClientPresenter> {
    return this.clientFind.findOneClientById(clientId);
  }

  async findAllClient(
    params: ClientFindAllDTO,
  ): Promise<FindAllPresent<ClientPresenter>> {
    return this.clientFind.findAllClient(params);
  }
}
