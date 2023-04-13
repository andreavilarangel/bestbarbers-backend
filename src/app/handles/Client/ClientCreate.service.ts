import { Injectable } from '@nestjs/common';
import { ClientCreateDTO } from 'src/app/dtos/Client.dto';
import { ClientPresenter } from 'src/app/presenter/Client.presenter';
import { ClientRepository } from 'src/core/repositories/Client.repository';
import { ClientCreateServiceInterface } from './ClientHandle.interface';
import { UserFindService } from '../User/UserFind.service';
import { ClientAlreadyExistException } from 'src/app/errors/Client.error';

@Injectable()
export class ClientCreateService implements ClientCreateServiceInterface {
  constructor(
    private readonly clientRepository: ClientRepository,
    private readonly userFindService: UserFindService,
  ) {}

  async createOneClient(newClient: ClientCreateDTO): Promise<ClientPresenter> {
    const user = await this.userFindService.checkUserExist(
      newClient.user.email,
      newClient.user.phone,
    );

    if (user) {
      const client = await this.clientRepository.findByUserId(user.id);
      if (client) throw new ClientAlreadyExistException();
    }

    const createdClient = await this.clientRepository.create({
      ...newClient,
      user: user ? { connect: { id: user.id } } : { create: newClient.user },
    });

    return createdClient;
  }
}
