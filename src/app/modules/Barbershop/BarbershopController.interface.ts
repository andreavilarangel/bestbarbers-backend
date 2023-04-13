import {
  BarbershopCreateDTO,
  BarbershopUpdateDTO,
  BarbershopFindAllDTO,
} from 'src/app/dtos/Barbershop.dto';
import { BarbershopPresenter } from 'src/app/presenter/Barbershop.presenter';
import { FindAllPresent } from 'src/app/presenter/FindAll.presenter';

export interface BarbershopControllerInterface {
  createOneBarbershop(
    newBarbershop: BarbershopCreateDTO,
  ): Promise<BarbershopPresenter>;
  updateOneBarbershop(
    barbershopId: string,
    dataBarbershop: BarbershopUpdateDTO,
  ): Promise<BarbershopPresenter>;
  getOneBarbershopById(barbershopId: string): Promise<BarbershopPresenter>;
  getAllBarbershop(
    queries: BarbershopFindAllDTO,
  ): Promise<FindAllPresent<BarbershopPresenter>>;
}
