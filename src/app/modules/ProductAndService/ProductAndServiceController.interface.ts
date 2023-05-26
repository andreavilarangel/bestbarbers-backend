import {
  ProductAndServiceCreateDTO,
  ProductAndServiceUpdateDTO,
  ProductAndServiceFindAllDTO,
} from 'src/app/dtos/ProductAndService.dto';
import { ProductAndServicePresenter } from 'src/app/modules/ProductAndService/ProductAndService.presenter';
import { FindAllPresent } from 'src/shared/FindAll.presenter';

export interface ProductAndServiceControllerInterface {
  createOneProductAndService(
    newProductAndService: ProductAndServiceCreateDTO,
  ): Promise<ProductAndServicePresenter>;
  updateOneProductAndService(
    productAndServiceId: string,
    dataProductAndService: ProductAndServiceUpdateDTO,
  ): Promise<ProductAndServicePresenter>;
  getOneProductAndServiceById(
    productAndServiceId: string,
  ): Promise<ProductAndServicePresenter>;
  getAllProductAndService(
    queries: ProductAndServiceFindAllDTO,
  ): Promise<FindAllPresent<ProductAndServicePresenter>>;
}
