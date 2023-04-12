import { Module } from '@nestjs/common';
import { RepositoriesModule } from 'src/core/repositories/repositories.module';
import { UserHandle } from './User.handle';
import { UserCreateService } from './UserCreate.service';
import { UserFindService } from './UserFind.service';
import { UserUpdateService } from './UserUpdate.service';

@Module({
  imports: [RepositoriesModule],
  providers: [
    UserHandle,
    UserCreateService,
    UserUpdateService,
    UserFindService,
  ],
  exports: [UserHandle, UserCreateService, UserUpdateService, UserFindService],
})
export class UserHandleModule {}
