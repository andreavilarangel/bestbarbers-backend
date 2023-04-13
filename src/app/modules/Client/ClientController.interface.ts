
import {ClientCreateDTO, ClientUpdateDTO, ClientFindAllDTO} from 'src/app/dtos/Client.dto'
import { ClientPresenter } from 'src/app/presenter/Client.presenter'
import { FindAllPresent } from 'src/app/presenter/FindAll.presenter'

export interface ClientControllerInterface {
  createOneClient(newClient: ClientCreateDTO): Promise<ClientPresenter>
  updateOneClient(clientId: string, dataClient: ClientUpdateDTO): Promise<ClientPresenter>
  getOneClientById(clientId: string): Promise<ClientPresenter>
  getAllClient(queries: ClientFindAllDTO): Promise<FindAllPresent<ClientPresenter>>
}
