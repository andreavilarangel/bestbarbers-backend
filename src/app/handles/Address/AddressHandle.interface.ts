import {
  AddressCreateDTO,
  AddressUpdateDTO,
  AddressFindAllDTO,
} from 'src/app/dtos/Address.dto';
import { FindAllPresent } from 'src/app/presenter/FindAll.presenter';
import { AddressPresenter } from 'src/app/presenter/Address.presenter';

export interface AddressCreateServiceInterface {
  createOneAddress(newAddress: AddressCreateDTO): Promise<AddressPresenter>;
}

export interface AddressUpdateServiceInterface {
  updateOneAddress(
    addressId: string,
    dataAddress: AddressUpdateDTO,
  ): Promise<AddressPresenter>;
}

export interface AddressFindServiceInterface {
  findOneAddressById(addressId: string): Promise<AddressPresenter>;
  findAllAddress(
    params: AddressFindAllDTO,
  ): Promise<FindAllPresent<AddressPresenter>>;
}

export interface AddressHandleInterface
  extends AddressCreateServiceInterface,
    AddressUpdateServiceInterface,
    AddressFindServiceInterface {}
