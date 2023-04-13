import { Injectable } from '@nestjs/common';
import { EmployerCreateDTO } from 'src/app/dtos/Employer.dto';
import { EmployerPresenter } from 'src/app/presenter/Employer.presenter';
import { EmployerRepository } from 'src/core/repositories/Employer.repository';
import { EmployerCreateServiceInterface } from './EmployerHandle.interface';
import { UserFindService } from '../User/UserFind.service';
import { UserAlreadyExistException } from 'src/app/errors/User.error';

@Injectable()
export class EmployerCreateService implements EmployerCreateServiceInterface {
  constructor(
    private readonly employerRepository: EmployerRepository,
    private readonly userFindService: UserFindService,
  ) {}

  async createOneEmployer(
    newEmployer: EmployerCreateDTO,
  ): Promise<EmployerPresenter> {
    const user = await this.userFindService.checkUserExist(
      newEmployer.user.email,
      newEmployer.user.phone,
    );

    if (user) throw new UserAlreadyExistException();

    const createdClient = await this.employerRepository.create({
      ...newEmployer,
      user: { create: newEmployer.user },
      barbershop: { connect: { id: newEmployer.barbershop_id } },
    });

    return createdClient;
  }
}
