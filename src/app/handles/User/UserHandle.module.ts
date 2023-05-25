import { Module } from '@nestjs/common';
import { RepositoriesModule } from 'src/core/repositories/repositories.module';
import { UserHandle } from './User.handle';

@Module({
  imports: [RepositoriesModule],
  providers: [UserHandle],
  exports: [UserHandle],
})
export class UserHandleModule {}
