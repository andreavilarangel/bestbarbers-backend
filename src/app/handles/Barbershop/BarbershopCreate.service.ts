import { Injectable } from '@nestjs/common';
import { BarbershopCreateDTO } from 'src/app/dtos/Barbershop.dto';
import { BarbershopPresenter } from 'src/app/presenter/Barbershop.presenter';
import { BarbershopRepository } from 'src/core/repositories/Barbershop.repository';
import { BarbershopCreateServiceInterface } from './BarbershopHandle.interface';
import { UserFindService } from '../User/UserFind.service';
import { UsuarioAlreadyExistException } from 'src/app/errors/Usuario.error';
import { BarbershopOpeningHourRepository } from 'src/core/repositories/BarbershopOpeningHour.repository';

@Injectable()
export class BarbershopCreateService
  implements BarbershopCreateServiceInterface
{
  constructor(
    private readonly barbershopRepository: BarbershopRepository,
    private readonly barbershopOpeningHourRepository: BarbershopOpeningHourRepository,
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

    const days = [
      { day: 1, day_reference: 'monday' },
      { day: 2, day_reference: 'tuesday' },
      { day: 3, day_reference: 'wednesday' },
      { day: 4, day_reference: 'thursday' },
      { day: 5, day_reference: 'friday' },
      { day: 6, day_reference: 'saturday' },
      { day: 7, day_reference: 'sunday' },
    ];
    days.forEach((item) =>
      this.barbershopOpeningHourRepository.create({
        ...item,
        barbershop: { connect: { id: createdBarbershop.id } },
      }),
    );

    return createdBarbershop;
  }
}
