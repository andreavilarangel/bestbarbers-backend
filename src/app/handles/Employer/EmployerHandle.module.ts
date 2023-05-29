import { Module } from '@nestjs/common';
import { RepositoriesModule } from 'src/app/repositories.module';
import { EmployerHandle } from './Employer.handle';
import { UserHandle } from '../User/User.handle';

@Module({
  imports: [RepositoriesModule],
  providers: [EmployerHandle, EmployerHandle, UserHandle],
  exports: [EmployerHandle, EmployerHandle],
})
export class EmployerHandleModule {}
