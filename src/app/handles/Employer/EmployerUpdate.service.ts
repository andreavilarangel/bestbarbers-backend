import { Injectable } from '@nestjs/common';
import { EmployerUpdateDTO } from 'src/app/dtos/Employer.dto';
import { EmployerPresenter } from 'src/app/presenter/Employer.presenter';
import { EmployerRepository } from 'src/core/repositories/Employer.repository';
import { EmployerFindService } from './EmployerFind.service';
import { EmployerUpdateServiceInterface } from './EmployerHandle.interface';

@Injectable()
export class EmployerUpdateService implements EmployerUpdateServiceInterface {
  constructor(
    private readonly employerRepository: EmployerRepository,
    private readonly employerFindService: EmployerFindService,
  ) {}

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
}
