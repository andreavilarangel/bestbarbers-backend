import { Module } from '@nestjs/common';
import { RepositoriesModule } from 'src/app/repositories.module';
import { BarbershopClientHandle } from './BarbershopClient.handle';

@Module({
  imports: [RepositoriesModule],
  providers: [BarbershopClientHandle],
  exports: [BarbershopClientHandle],
})
export class BarbershopClientHandleModule {}
