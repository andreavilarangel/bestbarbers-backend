import { Injectable } from '@nestjs/common';
import { omit } from 'radash';
import {
  EmployerCreateDTO,
  EmployerUpdateDTO,
  EmployerFindAllDTO,
} from 'src/app/modules/Employer/Employer.dto';
import { FindAllPresent } from 'src/shared/FindAll.presenter';
import { EmployerPresenter } from 'src/app/modules/Employer/Employer.presenter';

import { UserHandle } from '../User/User.handle';
import { UserAlreadyExistException } from 'src/app/modules/User/User.error';
import { EmployerNotFoundException } from 'src/app/modules/Employer/Employer.error';
import { EmployerRepository } from 'src/app/modules/Employer/Employer.repository';

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

  async findEmployersByBarbershopId(
    barbershop_id: string,
  ): Promise<FindAllPresent<EmployerPresenter>> {
    const [data, total] = await this.employerRepository.findAll({
      where: {
        barbershop_id,
        inactive: false,
      },
    });

    return {
      data,
      total,
    };
  }

  async findEmployerById(employer_id: string): Promise<EmployerPresenter> {
    const employer = await this.employerRepository.findOne(employer_id);
    if (!employer) throw new EmployerNotFoundException({ employer_id });
    return employer;
  }

  async deleteOneEmployer(employerId: string): Promise<EmployerPresenter> {
    const barbershopUpdated = await this.employerRepository.update(employerId, {
      inactive: true,
      user: {
        update: { inactive: true },
      },
    });

    return barbershopUpdated;
  }
}
