import { Prisma } from '@prisma/client';
import { ClientEntity } from 'src/app/modules/Client/Client.entity';
import {
  FindAllParamsType,
  FindAllResponseType,
} from 'src/shared/interfaces/FindAll.type';

export interface ClientRepositoryInterface {
  create(newClient: Prisma.ClientCreateInput): Promise<ClientEntity>;
  update(
    clientId: string,
    dataClient: Prisma.ClientUpdateInput,
  ): Promise<ClientEntity>;
  findByUserId(user_id: string): Promise<ClientEntity>;
  findOne(clientId: string): Promise<ClientEntity>;
  findAll(
    params: FindAllParamsType<Prisma.ClientWhereInput>,
  ): Promise<FindAllResponseType<ClientEntity>>;
  delete(clientId: string): Promise<ClientEntity>;
}
