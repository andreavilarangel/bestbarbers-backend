
import { Module } from '@nestjs/common'
import { ClientHandleModule } from 'src/app/handles/Client/ClientHandle.module'
import { RepositoriesModule } from 'src/core/repositories/repositories.module'
import { ClientController } from './Client.controller'

@Module({
  imports: [RepositoriesModule, ClientHandleModule],
  controllers: [ClientController],
})
export class ClientModule {}
