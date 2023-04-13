import {
  BarbershopOpeningHourCreateDTO,
  BarbershopOpeningHourUpdateDTO,
  BarbershopOpeningHourFindAllDTO,
} from 'src/app/dtos/BarbershopOpeningHour.dto';
import { BarbershopOpeningHourPresenter } from 'src/app/presenter/BarbershopOpeningHour.presenter';
import { FindAllPresent } from 'src/app/presenter/FindAll.presenter';

export interface BarbershopOpeningHourControllerInterface {
  createOneBarbershopOpeningHour(
    newBarbershopOpeningHour: BarbershopOpeningHourCreateDTO,
  ): Promise<BarbershopOpeningHourPresenter>;
  updateOneBarbershopOpeningHour(
    barbershopOpeningHourId: string,
    dataBarbershopOpeningHour: BarbershopOpeningHourUpdateDTO,
  ): Promise<BarbershopOpeningHourPresenter>;
  getOneBarbershopOpeningHourById(
    barbershopOpeningHourId: string,
  ): Promise<BarbershopOpeningHourPresenter>;
  getAllBarbershopOpeningHour(
    queries: BarbershopOpeningHourFindAllDTO,
  ): Promise<FindAllPresent<BarbershopOpeningHourPresenter>>;
}
