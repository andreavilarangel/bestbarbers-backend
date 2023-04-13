import { Injectable } from '@nestjs/common'
import { ClientUpdateDTO } from 'src/app/dtos/Client.dto'
import { ClientPresenter } from 'src/app/presenter/Client.presenter'
import { ClientRepository } from 'src/core/repositories/Client.repository'
import { ClientFindService } from './ClientFind.service'
import { ClientUpdateServiceInterface } from './ClientHandle.interface'

@Injectable()
export class ClientUpdateService implements ClientUpdateServiceInterface {
  constructor(
    private readonly clientRepository: ClientRepository,
    private readonly clientFindService: ClientFindService,
  ) {}

  async updateOneClient(clientId: string, dataClient: ClientUpdateDTO): Promise<ClientPresenter> {   
    // valida se existe Client
    await this.clientFindService.findOneClientById(clientId)

    return this.clientRepository.update(clientId, dataClient)
  }
}