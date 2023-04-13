import { Injectable } from '@nestjs/common';
import { BarbershopCreateDTO } from 'src/app/dtos/Barbershop.dto';
import { BarbershopPresenter } from 'src/app/presenter/Barbershop.presenter';
import { BarbershopRepository } from 'src/core/repositories/Barbershop.repository';
import { BarbershopCreateServiceInterface } from './BarbershopHandle.interface';
import { UserFindService } from '../User/UserFind.service';
import { UsuarioAlreadyExistException } from 'src/app/errors/Usuario.error';

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
    const user = await this.userFindService.checkUserExist(
      newBarbershop.user.email,
      newBarbershop.user.phone,
    );

    if (user) throw new UsuarioAlreadyExistException();

    const createdBarbershop = await this.barbershopRepository.create({
      ...newBarbershop,
      user: { create: newBarbershop.user },
    });

    return createdBarbershop;
  }
}
