import { Module } from '@nestjs/common';
import { AddressHandleModule } from 'src/app/handles/Address/AddressHandle.module';
import { RepositoriesModule } from 'src/app/repositories.module';
import { AddressController } from './Address.controller';

@Module({
  imports: [RepositoriesModule, AddressHandleModule],
  controllers: [AddressController],
})
export class AddressModule {}
