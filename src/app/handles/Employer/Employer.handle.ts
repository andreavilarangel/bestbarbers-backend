import { Injectable } from '@nestjs/common';
import { omit } from 'radash';
import {
  EmployerCreateDTO,
  EmployerUpdateDTO,
  EmployerFindAllDTO,
} from 'src/app/dtos/Employer.dto';
import { FindAllPresent } from 'src/app/presenter/FindAll.presenter';
import { EmployerPresenter } from 'src/app/presenter/Employer.presenter';

import { UserHandle } from '../User/User.handle';
import { UserAlreadyExistException } from 'src/app/errors/User.error';
import { EmployerRepository } from 'src/app/modules/Employer/Employer.repository';
import { EmployerNotFoundException } from 'src/app/errors/Employer.error';

@Injectable()
export class EmployerHandle {
  constructor(
    private readonly employerRepository: EmployerRepository,
    private readonly userFindService: UserHandle,
  ) {}

  async createOneEmployer(
    newEmployer: EmployerCreateDTO,
  ): Promise<EmployerPresenter> {
    const user = await this.userFindService.checkUserExist(
      newEmployer.user.email,
      newEmployer.user.phone,
    );

    if (user) throw new UserAlreadyExistException();

    const createdEmployer = await this.employerRepository.create({
      ...omit(newEmployer, ['barbershop_id']),
      user: { create: newEmployer.user },
      barbershop: { connect: { id: newEmployer.barbershop_id } },
    });

    return createdEmployer;
  }

  async updateOneEmployer(
    employerId: string,
    dataEmployer: EmployerUpdateDTO,
  ): Promise<EmployerPresenter> {
    const barbershopUpdated = await this.employerRepository.update(employerId, {
      ...dataEmployer,
      user: {
        update: dataEmployer.user,
      },
    });

    return barbershopUpdated;
  }

  async findOneEmployerById(employerId: string): Promise<EmployerPresenter> {
    const employer = await this.employerRepository.findOne(employerId);

    if (!employer) throw new EmployerNotFoundException({ employerId });

    return employer;
  }

  async findEmployersByBarbershopId(
    params: EmployerFindAllDTO,
  ): Promise<FindAllPresent<EmployerPresenter>> {
    const [data, total] = await this.employerRepository.findAll({
      skip: params.skip,
      take: params.take,
      where: {
        barbershop_id: params.barbershop_id,
      },
    });

    return {
      data,
      total,
    };
  }

  async findAllEmployer(
    params: EmployerFindAllDTO,
  ): Promise<FindAllPresent<EmployerPresenter>> {
    const [data, total] = await this.employerRepository.findAll({
      skip: params.skip,
      take: params.take,
      where: { barbershop_id: params.barbershop_id },
    });

    return {
      data,
      total,
    };
  }
}
