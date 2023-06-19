import { Injectable } from '@nestjs/common';
import { omit } from 'radash';
import {
  ServiceCreateDTO,
  ServiceUpdateDTO,
} from 'src/app/modules/Service/Service.dto';
import { FindAllPresent } from 'src/shared/FindAll.presenter';
import { BarbershopHandle } from '../Barbershop/Barbershop.handle';
import { ServicePresenter } from 'src/app/modules/Service/Service.presenter';
import { ServiceRepository } from 'src/app/modules/Service/Service.repository';
import { ServiceNotFoundException } from 'src/app/modules/Service/Service.error';

@Injectable()
export class ServiceHandle {
  constructor(
    private readonly serviceRepository: ServiceRepository,
    private readonly barbershopHandle: BarbershopHandle,
  ) {}

  async createOneService(
    newService: ServiceCreateDTO,
  ): Promise<ServicePresenter> {
    const { barbershop_id } = newService;
    await this.barbershopHandle.findOneBarbershopById(barbershop_id);

    return this.serviceRepository.create({
      ...omit(newService, ['barbershop_id']),
      barbershop: { connect: { id: barbershop_id } },
    });
  }

  async updateOneService(
    serviceId: string,
    dataService: ServiceUpdateDTO,
  ): Promise<ServicePresenter> {
    await this.findOneServiceById(serviceId);

    return this.serviceRepository.update(serviceId, dataService);
  }

  async findOneServiceById(serviceId: string): Promise<ServicePresenter> {
    const productAndService = await this.serviceRepository.findOne(serviceId);
    if (!productAndService) throw new ServiceNotFoundException({ serviceId });
    return productAndService;
  }

  async findBarbershopServices(
    barbershop_id: string,
  ): Promise<FindAllPresent<ServicePresenter>> {
    const [data, total] = await this.serviceRepository.findAll({
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

  async deleteOneService(serviceId: string): Promise<ServicePresenter> {
    await this.findOneServiceById(serviceId);
    return this.serviceRepository.update(serviceId, {
      inactive: true,
    });
  }
}
