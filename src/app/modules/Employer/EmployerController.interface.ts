import {
  EmployerCreateDTO,
  EmployerUpdateDTO,
  EmployerFindAllDTO,
} from 'src/app/dtos/Employer.dto';
import { EmployerPresenter } from 'src/app/modules/Employer/Employer.presenter';
import { FindAllPresent } from 'src/shared/FindAll.presenter';

export interface EmployerControllerInterface {
  createOneEmployer(newEmployer: EmployerCreateDTO): Promise<EmployerPresenter>;
  updateOneEmployer(
    employerId: string,
    dataEmployer: EmployerUpdateDTO,
  ): Promise<EmployerPresenter>;
  getOneEmployerById(employerId: string): Promise<EmployerPresenter>;
  getAllEmployer(
    queries: EmployerFindAllDTO,
  ): Promise<FindAllPresent<EmployerPresenter>>;
}
