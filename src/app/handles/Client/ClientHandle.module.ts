import { Module } from '@nestjs/common';
import { RepositoriesModule } from 'src/core/repositories/repositories.module';
import { ClientHandle } from './Client.handle';

import { UserHandle } from '../User/User.handle';

@Module({
  imports: [RepositoriesModule],
  providers: [ClientHandle, UserHandle],
  exports: [ClientHandle],
})
export class ClientHandleModule {}
