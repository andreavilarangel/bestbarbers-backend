import { Module } from '@nestjs/common';
import { RepositoriesModule } from 'src/core/repositories/repositories.module';
import { BarbershopHandle } from './Barbershop.handle';
import { UserHandle } from '../User/User.handle';

@Module({
  imports: [RepositoriesModule],
  providers: [BarbershopHandle, UserHandle],
  exports: [BarbershopHandle],
})
export class BarbershopHandleModule {}
