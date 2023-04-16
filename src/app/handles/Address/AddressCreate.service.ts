import { Injectable } from '@nestjs/common';
import { AddressCreateDTO } from 'src/app/dtos/Address.dto';
import { AddressPresenter } from 'src/app/presenter/Address.presenter';
import { AddressRepository } from 'src/core/repositories/Address.repository';
import { AddressCreateServiceInterface } from './AddressHandle.interface';

@Injectable()
export class AddressCreateService implements AddressCreateServiceInterface {
  constructor(private readonly addressRepository: AddressRepository) {}

  async createOneAddress(
    newAddress: AddressCreateDTO,
  ): Promise<AddressPresenter> {
    return this.addressRepository.create(newAddress);
  }
}
