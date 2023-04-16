import { Injectable } from '@nestjs/common';
import { AddressUpdateDTO } from 'src/app/dtos/Address.dto';
import { AddressPresenter } from 'src/app/presenter/Address.presenter';
import { AddressRepository } from 'src/core/repositories/Address.repository';
import { AddressFindService } from './AddressFind.service';
import { AddressUpdateServiceInterface } from './AddressHandle.interface';

@Injectable()
export class AddressUpdateService implements AddressUpdateServiceInterface {
  constructor(
    private readonly addressRepository: AddressRepository,
    private readonly addressFindService: AddressFindService,
  ) {}

  async updateOneAddress(
    addressId: string,
    dataAddress: AddressUpdateDTO,
  ): Promise<AddressPresenter> {
    // valida se existe Address
    await this.addressFindService.findOneAddressById(addressId);

    return this.addressRepository.update(addressId, dataAddress);
  }
}
