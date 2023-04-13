import { Injectable } from '@nestjs/common';
import { ProductAndServiceFindAllDTO } from 'src/app/dtos/ProductAndService.dto';
import { ProductAndServicePresenter } from 'src/app/presenter/ProductAndService.presenter';
import { FindAllPresent } from 'src/app/presenter/FindAll.presenter';
import { ProductAndServiceRepository } from 'src/core/repositories/ProductAndService.repository';
import { ProductAndServiceFindServiceInterface } from './ProductAndServiceHandle.interface';
import { ProductAndServiceNotFoundException } from 'src/app/errors/ProductAndService.error';

@Injectable()
export class ProductAndServiceFindService
  implements ProductAndServiceFindServiceInterface
{
  constructor(
    private readonly productAndServiceRepository: ProductAndServiceRepository,
  ) {}

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

  async findAllProductAndService(
    params: ProductAndServiceFindAllDTO,
  ): Promise<FindAllPresent<ProductAndServicePresenter>> {
    const [data, total] = await this.productAndServiceRepository.findAll({
      skip: params.skip,
      take: params.take,
      where: {},
    });

    return {
      data,
      total,
    };
  }
}
