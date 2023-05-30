import { Injectable } from '@nestjs/common';
import {
  BarbershopCreateDTO,
  BarbershopUpdateDTO,
  BarbershopFindAllDTO,
} from 'src/app/modules/Barbershop/Barbershop.dto';
import { FindAllPresent } from 'src/shared/FindAll.presenter';
import { BarbershopPresenter } from 'src/app/modules/Barbershop/Barbershop.presenter';
import { BarbershopRepository } from 'src/app/modules/Barbershop/Barbershop.repository';
import { UserHandle } from '../User/User.handle';
import { BarbershopOpeningHourRepository } from 'src/app/modules/BarbershopOpeningHour/BarbershopOpeningHour.repository';
import { UserAlreadyExistException } from 'src/app/handles/User/User.error';
import { BarbershopNotFoundException } from 'src/app/handles/Barbershop/Barbershop.error';

@Injectable()
export class BarbershopHandle {
  constructor(
    private readonly barbershopRepository: BarbershopRepository,
    private readonly barbershopOpeningHourRepository: BarbershopOpeningHourRepository,
    private readonly userFindService: UserHandle,
  ) {}

  async createOneBarbershop(
    newBarbershop: BarbershopCreateDTO,
  ): Promise<BarbershopPresenter> {
    const user = await this.userFindService.checkUserExist(
      newBarbershop.user.email,
      newBarbershop.user.phone,
    );

    if (user) throw new UserAlreadyExistException();

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

  async updateOneBarbershop(
    barbershopId: string,
    dataBarbershop: BarbershopUpdateDTO,
  ): Promise<BarbershopPresenter> {
    // valida se existe Barbershop
    await this.findOneBarbershopById(barbershopId);
    const barbershopUpdated = await this.barbershopRepository.update(
      barbershopId,
      {
        ...dataBarbershop,
        user: {
          update: dataBarbershop.user,
        },
      },
    );

    return barbershopUpdated;
  }

  async findOneBarbershopById(
    barbershopId: string,
  ): Promise<BarbershopPresenter> {
    const barbershop = await this.barbershopRepository.findOne(barbershopId);
    if (!barbershop) throw new BarbershopNotFoundException({ barbershopId });
    return barbershop;
  }

  async findOneBarbershopByUserId(
    userId: string,
  ): Promise<BarbershopPresenter> {
    const barbershop = await this.barbershopRepository.findByUserId(userId);
    if (!barbershop) throw new BarbershopNotFoundException({ userId });
    return barbershop;
  }

  async findAllBarbershop(
    params: BarbershopFindAllDTO,
  ): Promise<FindAllPresent<BarbershopPresenter>> {
    const [data, total] = await this.barbershopRepository.findAll({
      skip: params.skip,
      take: params.take,
      where: {},
    });

    return {
      data,
      total,
    };
  }
}
