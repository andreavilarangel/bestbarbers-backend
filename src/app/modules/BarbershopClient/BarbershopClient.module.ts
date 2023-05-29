import { Module } from '@nestjs/common';
import { BarbershopClientHandleModule } from 'src/app/handles/BarbershopClient/BarbershopClientHandle.module';
import { RepositoriesModule } from 'src/app/repositories.module';
import { BarbershopClientController } from './BarbershopClient.controller';

@Module({
  imports: [RepositoriesModule, BarbershopClientHandleModule],
  controllers: [BarbershopClientController],
})
export class BarbershopClientModule {}
