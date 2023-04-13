import { Injectable } from '@nestjs/common'
import { Prisma } from '@prisma/client'
import { PrismaService } from 'src/infrastructure/database/prisma/prisma.service'
import {
  FindAllParamsType,
  FindAllResponseType,
} from 'src/shared/interfaces/FindAll.type'
import { ClientRepositoryInterface } from './interface/ClientRepository.interface'
import { ClientEntity } from '../entities/Client.entity'

@Injectable()
export class ClientRepository implements ClientRepositoryInterface {
  constructor(private readonly prisma: PrismaService) {}

  async create(
    newClient: Prisma.ClientCreateInput,
  ): Promise<ClientEntity> {
    return this.prisma.client.create({
      data: newClient,
    })
  }

  async update(
    clientId: string,
    dataClient: Prisma.ClientUpdateInput,
  ): Promise<ClientEntity> {
    return this.prisma.client.update({
      where: {
        id: clientId,
      },
      data: dataClient,
    })
  }

  async findOne(clientId: string): Promise<ClientEntity> {
    return this.prisma. client.findUnique({
      where: {
        id: clientId
      },
    })
  }

  async findAll(
    params: FindAllParamsType<Prisma.ClientWhereInput>,
  ): Promise<FindAllResponseType<ClientEntity>> {
    return this.prisma.$transaction([
      this.prisma.client.findMany({
        skip: params.skip,
        take: params.take,
        where: params.where,
      }),
      this.prisma.client.count({ where: params.where }),
    ])
  }

  async delete(clientId: string): Promise<ClientEntity> {
    return this.prisma.client.delete({
      where: {
        id: clientId,
      },
    })
  }
}

