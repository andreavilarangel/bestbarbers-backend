import {
  BarbershopCreateDTO,
  BarbershopUpdateDTO,
  BarbershopFindAllDTO,
} from 'src/app/dtos/Barbershop.dto';
import { FindAllPresent } from 'src/app/presenter/FindAll.presenter';
import { BarbershopPresenter } from 'src/app/presenter/Barbershop.presenter';

export interface BarbershopCreateServiceInterface {
  createOneBarbershop(
    newBarbershop: BarbershopCreateDTO,
  ): Promise<BarbershopPresenter>;
}

export interface BarbershopUpdateServiceInterface {
  updateOneBarbershop(
    barbershopId: string,
    dataBarbershop: BarbershopUpdateDTO,
  ): Promise<BarbershopPresenter>;
}

export interface BarbershopFindServiceInterface {
  findOneBarbershopById(barbershopId: string): Promise<BarbershopPresenter>;
  findOneBarbershopByUserId(userId: string): Promise<BarbershopPresenter>;
  findAllBarbershop(
    params: BarbershopFindAllDTO,
  ): Promise<FindAllPresent<BarbershopPresenter>>;
}

export interface BarbershopHandleInterface
  extends BarbershopCreateServiceInterface,
    BarbershopUpdateServiceInterface,
    BarbershopFindServiceInterface {}
