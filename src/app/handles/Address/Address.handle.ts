import { Injectable } from '@nestjs/common';
import {
  AddressCreateDTO,
  AddressUpdateDTO,
  AddressFindAllDTO,
} from 'src/app/dtos/Address.dto';
import { FindAllPresent } from 'src/app/presenter/FindAll.presenter';
import { AddressPresenter } from 'src/app/presenter/Address.presenter';
import { AddressCreateService } from './AddressCreate.service';
import { AddressFindService } from './AddressFind.service';
import { AddressHandleInterface } from './AddressHandle.interface';
import { AddressUpdateService } from './AddressUpdate.service';

@Injectable()
export class AddressHandle implements AddressHandleInterface {
  constructor(
    private readonly addressCreate: AddressCreateService,
    private readonly addressUpdate: AddressUpdateService,
    private readonly addressFind: AddressFindService,
  ) {}

  async createOneAddress(
    newAddress: AddressCreateDTO,
  ): Promise<AddressPresenter> {
    return this.addressCreate.createOneAddress(newAddress);
  }

  async updateOneAddress(
    addressId: string,
    dataAddress: AddressUpdateDTO,
  ): Promise<AddressPresenter> {
    return this.addressUpdate.updateOneAddress(addressId, dataAddress);
  }

  async findOneAddressById(addressId: string): Promise<AddressPresenter> {
    return this.addressFind.findOneAddressById(addressId);
  }

  async findAllAddress(
    params: AddressFindAllDTO,
  ): Promise<FindAllPresent<AddressPresenter>> {
    return this.addressFind.findAllAddress(params);
  }
}
