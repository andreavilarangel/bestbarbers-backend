import { Module } from '@nestjs/common';
import { UserHandleModule } from 'src/app/handles/User/UserHandle.module';
import { RepositoriesModule } from 'src/app/repositories.module';
import { UserController } from './User.controller';

@Module({
  imports: [RepositoriesModule, UserHandleModule],
  controllers: [UserController],
})
export class UserModule {}
