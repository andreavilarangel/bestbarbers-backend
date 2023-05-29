import { Module } from '@nestjs/common';
import { RepositoriesModule } from 'src/app/repositories.module';
import { BlockedTimeHandle } from './BlockedTime.handle';
import { BarbershopHandle } from '../Barbershop/Barbershop.handle';
import { UserHandle } from '../User/User.handle';

@Module({
  imports: [RepositoriesModule],
  providers: [BlockedTimeHandle, BarbershopHandle, UserHandle],
  exports: [BlockedTimeHandle],
})
export class BlockedTimeHandleModule {}
