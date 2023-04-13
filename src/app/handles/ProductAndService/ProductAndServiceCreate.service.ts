import { Injectable } from '@nestjs/common';
import { omit } from 'radash';
import { ProductAndServiceCreateDTO } from 'src/app/dtos/ProductAndService.dto';
import { ProductAndServicePresenter } from 'src/app/presenter/ProductAndService.presenter';
import { ProductAndServiceRepository } from 'src/core/repositories/ProductAndService.repository';
import { ProductAndServiceCreateServiceInterface } from './ProductAndServiceHandle.interface';
import { BarbershopFindService } from '../Barbershop/BarbershopFind.service';

@Injectable()
export class ProductAndServiceCreateService
  implements ProductAndServiceCreateServiceInterface
{
  constructor(
    private readonly productAndServiceRepository: ProductAndServiceRepository,
    private readonly barbershopFindService: BarbershopFindService,
  ) {}

  async createOneProductAndService(
    newProductAndService: ProductAndServiceCreateDTO,
  ): Promise<ProductAndServicePresenter> {
    const { barbershop_id } = newProductAndService;
    await this.barbershopFindService.findOneBarbershopById(barbershop_id);

    return this.productAndServiceRepository.create({
      ...omit(newProductAndService, ['barbershop_id']),
      barbershop: { connect: { id: barbershop_id } },
    });
  }
}
