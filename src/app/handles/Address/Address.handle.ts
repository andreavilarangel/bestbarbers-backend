import { Injectable } from '@nestjs/common';
import {
  AddressCreateDTO,
  AddressUpdateDTO,
  AddressFindAllDTO,
} from 'src/app/modules/Address/Address.dto';
import { FindAllPresent } from 'src/shared/FindAll.presenter';
import { AddressPresenter } from 'src/app/modules/Address/Address.presenter';
import { AddressNotFoundException } from 'src/app/modules/Address/Address.error';

import { AddressRepository } from 'src/app/modules/Address/Address.repository';

@Injectable()
export class AddressHandle {
  constructor(private readonly addressRepository: AddressRepository) {}

  async createOneAddress(
    newAddress: AddressCreateDTO,
  ): Promise<AddressPresenter> {
    return this.addressRepository.create(newAddress);
  }

  async barbershopAddress(
    dataAddress: AddressCreateDTO,
  ): Promise<AddressPresenter> {
    const address = await this.addressRepository.findByBarbershopId(
      dataAddress.barbershop_id,
    );
    if (address) {
      return this.addressRepository.update(address.id, dataAddress);
    }
    return this.addressRepository.create(dataAddress);
  }

  async updateOneAddress(
    addressId: string,
    dataAddress: AddressUpdateDTO,
  ): Promise<AddressPresenter> {
    await this.findOneAddressById(addressId);
    return this.addressRepository.update(addressId, dataAddress);
  }

  async findOneAddressByBarbershopId(
    barbershop_id: string,
  ): Promise<AddressPresenter> {
    const address = await this.addressRepository.findByBarbershopId(
      barbershop_id,
    );
    if (!address) throw new AddressNotFoundException({ barbershop_id });
    return address;
  }

  async findOneAddressById(addressId: string): Promise<AddressPresenter> {
    const address = await this.addressRepository.findOne(addressId);
    if (!address) throw new AddressNotFoundException({ addressId });
    return address;
  }

  async findAllAddress(
    params: AddressFindAllDTO,
  ): Promise<FindAllPresent<AddressPresenter>> {
    const [data, total] = await this.addressRepository.findAll({
      skip: params.skip,
      take: params.take,
      where: {},
    });

    return {
      data,
      total,
    };
  }
}
