import { Module } from '@nestjs/common';
import { RepositoriesModule } from 'src/app/repositories.module';
import { BarbershopClientHandle } from './BarbershopClient.handle';
import { UserHandle } from '../User/User.handle';
import { ClientHandle } from '../Client/Client.handle';

@Module({
  imports: [RepositoriesModule],
  providers: [BarbershopClientHandle, UserHandle, ClientHandle],
  exports: [BarbershopClientHandle],
})
export class BarbershopClientHandleModule {}
