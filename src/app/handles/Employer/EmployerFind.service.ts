import { Injectable } from '@nestjs/common';
import { EmployerFindAllDTO } from 'src/app/dtos/Employer.dto';
import { EmployerPresenter } from 'src/app/presenter/Employer.presenter';
import { FindAllPresent } from 'src/app/presenter/FindAll.presenter';
import { EmployerRepository } from 'src/core/repositories/Employer.repository';
import { EmployerFindServiceInterface } from './EmployerHandle.interface';
import { EmployerNotFoundException } from 'src/app/errors/Employer.error';

@Injectable()
export class EmployerFindService implements EmployerFindServiceInterface {
  constructor(private readonly employerRepository: EmployerRepository) {}

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
