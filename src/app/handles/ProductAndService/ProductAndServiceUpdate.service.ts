import { Injectable } from '@nestjs/common';
import { ProductAndServiceUpdateDTO } from 'src/app/dtos/ProductAndService.dto';
import { ProductAndServicePresenter } from 'src/app/presenter/ProductAndService.presenter';
import { ProductAndServiceRepository } from 'src/core/repositories/ProductAndService.repository';
import { ProductAndServiceFindService } from './ProductAndServiceFind.service';
import { ProductAndServiceUpdateServiceInterface } from './ProductAndServiceHandle.interface';

@Injectable()
export class ProductAndServiceUpdateService
  implements ProductAndServiceUpdateServiceInterface
{
  constructor(
    private readonly productAndServiceRepository: ProductAndServiceRepository,
    private readonly productAndServiceFindService: ProductAndServiceFindService,
  ) {}

  async updateOneProductAndService(
    productAndServiceId: string,
    dataProductAndService: ProductAndServiceUpdateDTO,
  ): Promise<ProductAndServicePresenter> {
    // valida se existe ProductAndService
    await this.productAndServiceFindService.findOneProductAndServiceById(
      productAndServiceId,
    );

    return this.productAndServiceRepository.update(
      productAndServiceId,
      dataProductAndService,
    );
  }
}
