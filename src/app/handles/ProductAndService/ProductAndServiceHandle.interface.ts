import {
  ProductAndServiceCreateDTO,
  ProductAndServiceUpdateDTO,
  ProductAndServiceFindAllDTO,
} from 'src/app/dtos/ProductAndService.dto';
import { FindAllPresent } from 'src/app/presenter/FindAll.presenter';
import { ProductAndServicePresenter } from 'src/app/presenter/ProductAndService.presenter';

export interface ProductAndServiceCreateServiceInterface {
  createOneProductAndService(
    newProductAndService: ProductAndServiceCreateDTO,
  ): Promise<ProductAndServicePresenter>;
}

export interface ProductAndServiceUpdateServiceInterface {
  updateOneProductAndService(
    productAndServiceId: string,
    dataProductAndService: ProductAndServiceUpdateDTO,
  ): Promise<ProductAndServicePresenter>;
}

export interface ProductAndServiceFindServiceInterface {
  findOneProductAndServiceById(
    productAndServiceId: string,
  ): Promise<ProductAndServicePresenter>;
  findAllProductAndService(
    params: ProductAndServiceFindAllDTO,
  ): Promise<FindAllPresent<ProductAndServicePresenter>>;
}

export interface ProductAndServiceHandleInterface
  extends ProductAndServiceCreateServiceInterface,
    ProductAndServiceUpdateServiceInterface,
    ProductAndServiceFindServiceInterface {}
