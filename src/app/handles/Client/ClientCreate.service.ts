import { Injectable } from '@nestjs/common'
import { ClientCreateDTO } from 'src/app/dtos/Client.dto'
import { ClientPresenter } from 'src/app/presenter/Client.presenter'
import { ClientRepository } from 'src/core/repositories/Client.repository'
import { ClientCreateServiceInterface } from './ClientHandle.interface'

@Injectable()
export class ClientCreateService implements ClientCreateServiceInterface {
  constructor(private readonly clientRepository: ClientRepository) {}

  async createOneClient(newClient: ClientCreateDTO): Promise<ClientPresenter> {   
    return this.clientRepository.create(newClient)
  }
}
