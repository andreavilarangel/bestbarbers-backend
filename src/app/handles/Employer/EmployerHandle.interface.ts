import {
  EmployerCreateDTO,
  EmployerUpdateDTO,
  EmployerFindAllDTO,
} from 'src/app/dtos/Employer.dto';
import { FindAllPresent } from 'src/app/presenter/FindAll.presenter';
import { EmployerPresenter } from 'src/app/presenter/Employer.presenter';

export interface EmployerCreateServiceInterface {
  createOneEmployer(newEmployer: EmployerCreateDTO): Promise<EmployerPresenter>;
}

export interface EmployerUpdateServiceInterface {
  updateOneEmployer(
    employerId: string,
    dataEmployer: EmployerUpdateDTO,
  ): Promise<EmployerPresenter>;
}

export interface EmployerFindServiceInterface {
  findOneEmployerById(employerId: string): Promise<EmployerPresenter>;
  findAllEmployer(
    params: EmployerFindAllDTO,
  ): Promise<FindAllPresent<EmployerPresenter>>;
}

export interface EmployerHandleInterface
  extends EmployerCreateServiceInterface,
    EmployerUpdateServiceInterface,
    EmployerFindServiceInterface {}
