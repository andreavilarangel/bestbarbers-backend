import { Injectable } from '@nestjs/common';
import { ClientUpdateDTO } from 'src/app/dtos/Client.dto';
import { ClientPresenter } from 'src/app/presenter/Client.presenter';
import { ClientRepository } from 'src/core/repositories/Client.repository';
import { ClientFindService } from './ClientFind.service';
import { ClientUpdateServiceInterface } from './ClientHandle.interface';

@Injectable()
export class ClientUpdateService implements ClientUpdateServiceInterface {
  constructor(
    private readonly clientRepository: ClientRepository,
    private readonly clientFindService: ClientFindService,
  ) {}

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
}
