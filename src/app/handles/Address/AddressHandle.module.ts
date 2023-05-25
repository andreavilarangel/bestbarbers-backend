import { Module } from '@nestjs/common';
import { RepositoriesModule } from 'src/core/repositories/repositories.module';
import { AddressHandle } from './Address.handle';

@Module({
  imports: [RepositoriesModule],
  providers: [AddressHandle],
  exports: [AddressHandle],
})
export class AddressHandleModule {}
