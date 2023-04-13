import { Injectable } from '@nestjs/common';
import { ClientCreateDTO } from 'src/app/dtos/Client.dto';
import { ClientPresenter } from 'src/app/presenter/Client.presenter';
import { ClientRepository } from 'src/core/repositories/Client.repository';
import { ClientCreateServiceInterface } from './ClientHandle.interface';
import { UserFindService } from '../User/UserFind.service';
import { UserAlreadyExistException } from 'src/app/errors/User.error';

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

    if (user) throw new UserAlreadyExistException();

    const createdClient = await this.clientRepository.create({
      ...newClient,
      user: { create: newClient.user },
    });

    return createdClient;
  }
}
