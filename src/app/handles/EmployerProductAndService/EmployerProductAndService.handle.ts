import { Injectable } from '@nestjs/common';
import { omit } from 'radash';
import { EmployerProductAndServiceCreateDTO } from 'src/app/modules/EmployerProductAndService/EmployerProductAndService.dto';
import { EmployerProductAndServicePresenter } from 'src/app/modules/EmployerProductAndService/EmployerProductAndService.presenter';
import { EmployerProductAndServiceRepository } from 'src/app/modules/EmployerProductAndService/EmployerProductAndService.repository';
import { BarbershopHandle } from '../Barbershop/Barbershop.handle';
import { EmployerProductAndServiceNotFoundException } from 'src/app/modules/EmployerProductAndService/EmployerProductAndService.error';

@Injectable()
export class EmployerProductAndServiceHandle {
  constructor(
    private readonly employerProductAndServiceRepository: EmployerProductAndServiceRepository,
    private readonly barbershopHandle: BarbershopHandle,
  ) {}

  async createOrUpdateEmployerProductAndService(
    newEmployerProductAndService: EmployerProductAndServiceCreateDTO,
  ): Promise<EmployerProductAndServicePresenter> {
    const { barbershop_id, employer_id, product_and_service_id } =
      newEmployerProductAndService;

    await this.barbershopHandle.findOneBarbershopById(barbershop_id);

    const response = await this.employerProductAndServiceRepository.findOne(
      employer_id,
      product_and_service_id,
    );

    const dataToUpdate = omit(newEmployerProductAndService, [
      'barbershop_id',
      'employer_id',
      'product_and_service_id',
    ]);

    dataToUpdate.comission_value =
      (newEmployerProductAndService.comission_percentage / 100) *
      newEmployerProductAndService.value;

    if (response) {
      return this.employerProductAndServiceRepository.update(
        response.id,
        dataToUpdate,
      );
    }

    const createData = {
      ...dataToUpdate,
      barbershop: { connect: { id: barbershop_id } },
      employer: { connect: { id: employer_id } },
      product_and_service: { connect: { id: product_and_service_id } },
    };

    return this.employerProductAndServiceRepository.create(createData);
  }

  async getEmployerProductAndService(
    employer_id: string,
    product_and_service_id: string,
  ): Promise<EmployerProductAndServicePresenter> {
    const response = await this.employerProductAndServiceRepository.findOne(
      employer_id,
      product_and_service_id,
    );
    return response;
  }
}
