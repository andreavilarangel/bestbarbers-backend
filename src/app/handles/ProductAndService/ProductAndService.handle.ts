import { Injectable } from '@nestjs/common';
import {
  ProductAndServiceCreateDTO,
  ProductAndServiceUpdateDTO,
  ProductAndServiceFindAllDTO,
} from 'src/app/dtos/ProductAndService.dto';
import { FindAllPresent } from 'src/app/presenter/FindAll.presenter';
import { ProductAndServicePresenter } from 'src/app/presenter/ProductAndService.presenter';
import { ProductAndServiceCreateService } from './ProductAndServiceCreate.service';
import { ProductAndServiceFindService } from './ProductAndServiceFind.service';
import { ProductAndServiceHandleInterface } from './ProductAndServiceHandle.interface';
import { ProductAndServiceUpdateService } from './ProductAndServiceUpdate.service';

@Injectable()
export class ProductAndServiceHandle
  implements ProductAndServiceHandleInterface
{
  constructor(
    private readonly productAndServiceCreate: ProductAndServiceCreateService,
    private readonly productAndServiceUpdate: ProductAndServiceUpdateService,
    private readonly productAndServiceFind: ProductAndServiceFindService,
  ) {}

  async createOneProductAndService(
    newProductAndService: ProductAndServiceCreateDTO,
  ): Promise<ProductAndServicePresenter> {
    return this.productAndServiceCreate.createOneProductAndService(
      newProductAndService,
    );
  }

  async updateOneProductAndService(
    productAndServiceId: string,
    dataProductAndService: ProductAndServiceUpdateDTO,
  ): Promise<ProductAndServicePresenter> {
    return this.productAndServiceUpdate.updateOneProductAndService(
      productAndServiceId,
      dataProductAndService,
    );
  }

  async findOneProductAndServiceById(
    productAndServiceId: string,
  ): Promise<ProductAndServicePresenter> {
    return this.productAndServiceFind.findOneProductAndServiceById(
      productAndServiceId,
    );
  }

  async findAllProductAndService(
    params: ProductAndServiceFindAllDTO,
  ): Promise<FindAllPresent<ProductAndServicePresenter>> {
    return this.productAndServiceFind.findAllProductAndService(params);
  }
}
