import { Module } from '@nestjs/common';
import { RepositoriesModule } from 'src/core/repositories/repositories.module';
import { EmployerHandle } from './Employer.handle';
import { EmployerCreateService } from './EmployerCreate.service';
import { EmployerFindService } from './EmployerFind.service';
import { EmployerUpdateService } from './EmployerUpdate.service';
import { UserFindService } from '../User/UserFind.service';

@Module({
  imports: [RepositoriesModule],
  providers: [
    EmployerHandle,
    EmployerCreateService,
    EmployerUpdateService,
    EmployerFindService,
    UserFindService,
  ],
  exports: [
    EmployerHandle,
    EmployerCreateService,
    EmployerUpdateService,
    EmployerFindService,
  ],
})
export class EmployerHandleModule {}
