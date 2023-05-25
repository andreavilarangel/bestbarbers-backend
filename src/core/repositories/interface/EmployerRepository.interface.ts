import { Prisma } from '@prisma/client';
import { EmployerEntity } from 'src/app/modules/Employer/Employer.entity';
import {
  FindAllParamsType,
  FindAllResponseType,
} from 'src/shared/interfaces/FindAll.type';

export interface EmployerRepositoryInterface {
  create(newEmployer: Prisma.EmployerCreateInput): Promise<EmployerEntity>;
  update(
    employerId: string,
    dataEmployer: Prisma.EmployerUpdateInput,
  ): Promise<EmployerEntity>;
  findOne(employerId: string): Promise<EmployerEntity>;
  findAll(
    params: FindAllParamsType<Prisma.EmployerWhereInput>,
  ): Promise<FindAllResponseType<EmployerEntity>>;
  delete(employerId: string): Promise<EmployerEntity>;
}
