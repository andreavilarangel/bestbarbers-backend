import { Injectable } from '@nestjs/common';
import { omit } from 'radash';
import { BarbershopCreateDTO } from 'src/app/dtos/Barbershop.dto';
import { BarbershopPresenter } from 'src/app/presenter/Barbershop.presenter';
import { BarbershopRepository } from 'src/core/repositories/Barbershop.repository';
import { BarbershopCreateServiceInterface } from './BarbershopHandle.interface';
import { UserFindService } from '../User/UserFind.service';
import { UsuarioNotFoundException } from 'src/app/errors/Usuario.error';

@Injectable()
export class BarbershopCreateService
  implements BarbershopCreateServiceInterface
{
  constructor(
    private readonly barbershopRepository: BarbershopRepository,
    private readonly userFindService: UserFindService,
  ) {}

  async createOneBarbershop(
    newBarbershop: BarbershopCreateDTO,
  ): Promise<BarbershopPresenter> {
    const user = await this.userFindService.findOneUserById(
      newBarbershop.user_id,
    );
    if (!user) throw new UsuarioNotFoundException({});
    const createdBarbershop = await this.barbershopRepository.create({
      ...omit(newBarbershop, ['user_id']),
      user: { connect: { id: newBarbershop.user_id } },
    });

    return createdBarbershop;
  }
}
