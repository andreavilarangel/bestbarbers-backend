import { Injectable } from '@nestjs/common';
import { omit } from 'radash';
import {
  ProductAndServiceCreateDTO,
  ProductAndServiceUpdateDTO,
  ProductAndServiceFindAllDTO,
} from 'src/app/modules/ProductAndService/ProductAndService.dto';
import { FindAllPresent } from 'src/shared/FindAll.presenter';
import { ProductAndServicePresenter } from 'src/app/modules/ProductAndService/ProductAndService.presenter';
import { BarbershopHandle } from '../Barbershop/Barbershop.handle';
import { ProductAndServiceRepository } from 'src/app/modules/ProductAndService/ProductAndService.repository';
import { ProductAndServiceNotFoundException } from 'src/app/modules/ProductAndService/ProductAndService.error';

@Injectable()
export class ProductAndServiceHandle {
  constructor(
    private readonly productAndServiceRepository: ProductAndServiceRepository,
    private readonly barbershopHandle: BarbershopHandle,
  ) {}

  async createOneProductAndService(
    newProductAndService: ProductAndServiceCreateDTO,
  ): Promise<ProductAndServicePresenter> {
    const { barbershop_id } = newProductAndService;
    await this.barbershopHandle.findOneBarbershopById(barbershop_id);

    return this.productAndServiceRepository.create({
      ...omit(newProductAndService, ['barbershop_id']),
      barbershop: { connect: { id: barbershop_id } },
    });
  }

  async updateOneProductAndService(
    productAndServiceId: string,
    dataProductAndService: ProductAndServiceUpdateDTO,
  ): Promise<ProductAndServicePresenter> {
    // valida se existe ProductAndService
    await this.findOneProductAndServiceById(productAndServiceId);

    return this.productAndServiceRepository.update(
      productAndServiceId,
      dataProductAndService,
    );
  }

  async findOneProductAndServiceById(
    productAndServiceId: string,
  ): Promise<ProductAndServicePresenter> {
    const productAndService = await this.productAndServiceRepository.findOne(
      productAndServiceId,
    );

    if (!productAndService)
      throw new ProductAndServiceNotFoundException({ productAndServiceId });

    return productAndService;
  }

  async findBarbershopProducts(
    barbershop_id: string,
  ): Promise<FindAllPresent<ProductAndServicePresenter>> {
    const [data, total] = await this.productAndServiceRepository.findAll({
      where: {
        barbershop_id,
        type: 'product',
        inactive: false,
      },
    });
    return {
      data,
      total,
    };
  }

  async findBarbershopServices(
    barbershop_id: string,
  ): Promise<FindAllPresent<ProductAndServicePresenter>> {
    const [data, total] = await this.productAndServiceRepository.findAll({
      where: {
        barbershop_id,
        type: 'service',
        inactive: false,
      },
    });
    return {
      data,
      total,
    };
  }

  async deleteOneProductAndService(
    productAndServiceId: string,
  ): Promise<ProductAndServicePresenter> {
    // valida se existe ProductAndService
    await this.findOneProductAndServiceById(productAndServiceId);
    return this.productAndServiceRepository.update(productAndServiceId, {
      inactive: true,
    });
  }
}
