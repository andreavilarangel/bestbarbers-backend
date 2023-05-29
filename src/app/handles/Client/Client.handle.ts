import { Injectable } from '@nestjs/common';
import {
  ClientCreateDTO,
  ClientUpdateDTO,
  ClientFindAllDTO,
} from 'src/app/dtos/Client.dto';
import { FindAllPresent } from 'src/shared/FindAll.presenter';
import { ClientPresenter } from 'src/app/modules/Client/Client.presenter';

import { UserHandle } from '../User/User.handle';
import { UserAlreadyExistException } from 'src/app/errors/User.error';

import { ClientRepository } from 'src/app/modules/Client/Client.repository';
import { ClientNotFoundException } from 'src/app/errors/Client.error';

@Injectable()
export class ClientHandle {
  constructor(
    private readonly clientRepository: ClientRepository,
    private readonly userFindService: UserHandle,
  ) {}

  async createOneClient(newClient: ClientCreateDTO): Promise<ClientPresenter> {
    const user = await this.userFindService.checkUserExist(
      newClient.user.email,
      newClient.user.phone,
    );

    if (user) throw new UserAlreadyExistException();
    const createdClient = await this.clientRepository.create({
      ...newClient,
      user: { create: newClient.user },
    });
    return createdClient;
  }

  async updateOneClient(
    clientId: string,
    dataClient: ClientUpdateDTO,
  ): Promise<ClientPresenter> {
    const barbershopUpdated = await this.clientRepository.update(clientId, {
      ...dataClient,
      user: {
        update: dataClient.user,
      },
    });

    return barbershopUpdated;
  }

  async findOneClientById(clientId: string): Promise<ClientPresenter> {
    const client = await this.clientRepository.findOne(clientId);

    if (!client) throw new ClientNotFoundException({ clientId });

    return client;
  }

  async findOneClientByUserId(userId: string): Promise<ClientPresenter> {
    const client = await this.clientRepository.findByUserId(userId);

    if (!client) throw new ClientNotFoundException({ userId });

    return client;
  }

  async findAllClient(
    params: ClientFindAllDTO,
  ): Promise<FindAllPresent<ClientPresenter>> {
    const [data, total] = await this.clientRepository.findAll({
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
