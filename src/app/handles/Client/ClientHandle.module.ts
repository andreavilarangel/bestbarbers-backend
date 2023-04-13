import { Module } from '@nestjs/common';
import { RepositoriesModule } from 'src/core/repositories/repositories.module';
import { ClientHandle } from './Client.handle';
import { ClientCreateService } from './ClientCreate.service';
import { ClientFindService } from './ClientFind.service';
import { ClientUpdateService } from './ClientUpdate.service';
import { UserFindService } from '../User/UserFind.service';

@Module({
  imports: [RepositoriesModule],
  providers: [
    ClientHandle,
    ClientCreateService,
    ClientUpdateService,
    ClientFindService,
    UserFindService,
  ],
  exports: [
    ClientHandle,
    ClientCreateService,
    ClientUpdateService,
    ClientFindService,
  ],
})
export class ClientHandleModule {}
