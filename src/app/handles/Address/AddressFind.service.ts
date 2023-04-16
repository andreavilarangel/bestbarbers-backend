import { Injectable } from '@nestjs/common';
import { AddressFindAllDTO } from 'src/app/dtos/Address.dto';
import { AddressPresenter } from 'src/app/presenter/Address.presenter';
import { FindAllPresent } from 'src/app/presenter/FindAll.presenter';
import { AddressRepository } from 'src/core/repositories/Address.repository';
import { AddressFindServiceInterface } from './AddressHandle.interface';
import { AddressNotFoundException } from 'src/app/errors/Address.error';

@Injectable()
export class AddressFindService implements AddressFindServiceInterface {
  constructor(private readonly addressRepository: AddressRepository) {}

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
