import { Injectable } from '@nestjs/common';
import {
  AddressCreateDTO,
  AddressUpdateDTO,
  AddressFindAllDTO,
} from 'src/app/dtos/Address.dto';
import { FindAllPresent } from 'src/app/presenter/FindAll.presenter';
import { AddressPresenter } from 'src/app/modules/Address/Address.presenter';
import { AddressNotFoundException } from 'src/app/errors/Address.error';

import { AddressRepository } from 'src/app/modules/Address/Address.repository';

@Injectable()
export class AddressHandle {
  constructor(private readonly addressRepository: AddressRepository) {}

  async createOneAddress(
    newAddress: AddressCreateDTO,
  ): Promise<AddressPresenter> {
    return this.addressRepository.create(newAddress);
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
