import { Injectable } from '@nestjs/common';
import {
  EmployerCreateDTO,
  EmployerUpdateDTO,
  EmployerFindAllDTO,
} from 'src/app/dtos/Employer.dto';
import { FindAllPresent } from 'src/app/presenter/FindAll.presenter';
import { EmployerPresenter } from 'src/app/presenter/Employer.presenter';
import { EmployerCreateService } from './EmployerCreate.service';
import { EmployerFindService } from './EmployerFind.service';
import { EmployerHandleInterface } from './EmployerHandle.interface';
import { EmployerUpdateService } from './EmployerUpdate.service';

@Injectable()
export class EmployerHandle implements EmployerHandleInterface {
  constructor(
    private readonly employerCreate: EmployerCreateService,
    private readonly employerUpdate: EmployerUpdateService,
    private readonly employerFind: EmployerFindService,
  ) {}

  async createOneEmployer(
    newEmployer: EmployerCreateDTO,
  ): Promise<EmployerPresenter> {
    return this.employerCreate.createOneEmployer(newEmployer);
  }

  async updateOneEmployer(
    employerId: string,
    dataEmployer: EmployerUpdateDTO,
  ): Promise<EmployerPresenter> {
    return this.employerUpdate.updateOneEmployer(employerId, dataEmployer);
  }

  async findOneEmployerById(employerId: string): Promise<EmployerPresenter> {
    return this.employerFind.findOneEmployerById(employerId);
  }

  async findAllEmployer(
    params: EmployerFindAllDTO,
  ): Promise<FindAllPresent<EmployerPresenter>> {
    return this.employerFind.findAllEmployer(params);
  }
}
