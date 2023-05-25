import {
  AddressCreateDTO,
  AddressUpdateDTO,
  AddressFindAllDTO,
} from 'src/app/dtos/Address.dto';
import { AddressPresenter } from 'src/app/modules/Address/Address.presenter';
import { FindAllPresent } from 'src/app/presenter/FindAll.presenter';

export interface AddressControllerInterface {
  createOneAddress(newAddress: AddressCreateDTO): Promise<AddressPresenter>;
  updateOneAddress(
    addressId: string,
    dataAddress: AddressUpdateDTO,
  ): Promise<AddressPresenter>;
  getOneAddressById(addressId: string): Promise<AddressPresenter>;
  getAllAddress(
    queries: AddressFindAllDTO,
  ): Promise<FindAllPresent<AddressPresenter>>;
}
