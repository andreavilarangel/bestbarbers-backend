import {ClientCreateDTO, ClientUpdateDTO, ClientFindAllDTO} from 'src/app/dtos/Client.dto'
import { FindAllPresent } from 'src/app/presenter/FindAll.presenter'
import { ClientPresenter } from 'src/app/presenter/Client.presenter'

export interface ClientCreateServiceInterface {
  createOneClient(newClient: ClientCreateDTO): Promise<ClientPresenter>
}

export interface ClientUpdateServiceInterface {
  updateOneClient(clientId: string, dataClient: ClientUpdateDTO): Promise<ClientPresenter>
}

export interface ClientFindServiceInterface {
  findOneClientById(clientId: string): Promise<ClientPresenter>
  findAllClient(params: ClientFindAllDTO): Promise<FindAllPresent<ClientPresenter>>
}

export interface ClientHandleInterface
  extends ClientCreateServiceInterface,
    ClientUpdateServiceInterface,
    ClientFindServiceInterface {}
