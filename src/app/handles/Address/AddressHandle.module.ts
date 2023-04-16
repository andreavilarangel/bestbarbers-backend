import { Module } from '@nestjs/common';
import { RepositoriesModule } from 'src/core/repositories/repositories.module';
import { AddressHandle } from './Address.handle';
import { AddressCreateService } from './AddressCreate.service';
import { AddressFindService } from './AddressFind.service';
import { AddressUpdateService } from './AddressUpdate.service';

@Module({
  imports: [RepositoriesModule],
  providers: [
    AddressHandle,
    AddressCreateService,
    AddressUpdateService,
    AddressFindService,
  ],
  exports: [
    AddressHandle,
    AddressCreateService,
    AddressUpdateService,
    AddressFindService,
  ],
})
export class AddressHandleModule {}
