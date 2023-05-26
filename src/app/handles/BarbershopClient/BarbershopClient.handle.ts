import { Injectable } from '@nestjs/common';
import { omit } from 'radash';
import { BarbershopClientCreateDTO } from 'src/app/dtos/BarbershopClient.dto';
import { BarbershopClientPresenter } from 'src/app/modules/BarbershopClient/BarbershopClient.presenter';
import { BarbershopClientRepository } from 'src/app/modules/BarbershopClient/BarbershopClient.repository';
import { UserHandle } from '../User/User.handle';
import { ClientHandle } from '../Client/Client.handle';
import { ClientRepository } from 'src/app/modules/Client/Client.repository';

@Injectable()
export class BarbershopClientHandle {
  constructor(
    private readonly barbershopClientRepository: BarbershopClientRepository,
    private readonly clientRepository: ClientRepository,
    private readonly userFindService: UserHandle,
    private readonly clientHandle: ClientHandle,
  ) {}

  async createOneBarbershopClient(
    newBarbershopClient: BarbershopClientCreateDTO,
  ): Promise<BarbershopClientPresenter> {
    const user = await this.userFindService.checkUserExist(
      newBarbershopClient.user.email,
      newBarbershopClient.user.phone,
    );
    if (!user) {
      const createdClient = await this.clientRepository.create({
        ...omit(newBarbershopClient, ['barbershop_id']),
        user: {
          create: {
            ...newBarbershopClient.user,
            type: 'client',
            password: '323133',
          },
        },
      });
      return this.barbershopClientRepository.create({
        barbershop: { connect: { id: newBarbershopClient.barbershop_id } },
        client: { connect: { id: createdClient.id } },
      });
    }

    const client = await this.clientHandle.findOneClientByUserId(user.id);
    const isClient = await this.barbershopClientRepository.findOne(
      client.id,
      newBarbershopClient.barbershop_id,
    );

    if (isClient) {
      return isClient;
    }

    return this.barbershopClientRepository.create({
      barbershop: { connect: { id: newBarbershopClient.barbershop_id } },
      client: { connect: { id: client.id } },
    });
  }

  async deleteBarbershopClient(data: any): Promise<BarbershopClientPresenter> {
    const client = await this.barbershopClientRepository.findOne(
      data.client_id,
      data.barbershop_id,
    );

    return this.barbershopClientRepository.delete(client.id);
  }
}
