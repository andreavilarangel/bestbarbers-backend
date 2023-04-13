import { Injectable } from '@nestjs/common'
import { ClientFindAllDTO } from 'src/app/dtos/Client.dto'
import { ClientPresenter } from 'src/app/presenter/Client.presenter'
import { FindAllPresent } from 'src/app/presenter/FindAll.presenter'
import { ClientRepository } from 'src/core/repositories/Client.repository'
import { ClientFindServiceInterface } from './ClientHandle.interface'
import { ClientNotFoundException } from 'src/app/errors/Client.error'

@Injectable()
export class ClientFindService implements ClientFindServiceInterface {
  constructor(private readonly clientRepository: ClientRepository) {}

  async findOneClientById(clientId: string): Promise<ClientPresenter> {   
    const client = await this.clientRepository.findOne(clientId)

    if (!client) throw new ClientNotFoundException({ clientId })

    return client
  }

  async findAllClient(params: ClientFindAllDTO): Promise<FindAllPresent<ClientPresenter>> {
      const [data, total] = await this.clientRepository.findAll({
      skip: params.skip,
      take: params.take,
      where: {},
    })

    return {
      data,
      total,
    }  
  }
}
