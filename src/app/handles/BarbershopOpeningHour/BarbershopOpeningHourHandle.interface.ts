import {
  BarbershopOpeningHourCreateDTO,
  BarbershopOpeningHourUpdateDTO,
  BarbershopOpeningHourFindAllDTO,
} from 'src/app/dtos/BarbershopOpeningHour.dto';
import { FindAllPresent } from 'src/app/presenter/FindAll.presenter';
import { BarbershopOpeningHourPresenter } from 'src/app/presenter/BarbershopOpeningHour.presenter';

export interface BarbershopOpeningHourCreateServiceInterface {
  createOneBarbershopOpeningHour(
    newBarbershopOpeningHour: BarbershopOpeningHourCreateDTO,
  ): Promise<BarbershopOpeningHourPresenter>;
}

export interface BarbershopOpeningHourUpdateServiceInterface {
  updateOneBarbershopOpeningHour(
    barbershopOpeningHourId: string,
    dataBarbershopOpeningHour: BarbershopOpeningHourUpdateDTO,
  ): Promise<BarbershopOpeningHourPresenter>;
}

export interface BarbershopOpeningHourFindServiceInterface {
  findOneBarbershopOpeningHourById(
    barbershopOpeningHourId: string,
  ): Promise<BarbershopOpeningHourPresenter>;
  findAllBarbershopOpeningHour(
    params: BarbershopOpeningHourFindAllDTO,
  ): Promise<FindAllPresent<BarbershopOpeningHourPresenter>>;
}

export interface BarbershopOpeningHourHandleInterface
  extends BarbershopOpeningHourCreateServiceInterface,
    BarbershopOpeningHourUpdateServiceInterface,
    BarbershopOpeningHourFindServiceInterface {}
