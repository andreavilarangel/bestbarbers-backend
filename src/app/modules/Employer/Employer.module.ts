import { Module } from '@nestjs/common';
import { EmployerHandleModule } from 'src/app/handles/Employer/EmployerHandle.module';
import { RepositoriesModule } from 'src/core/repositories/repositories.module';
import { EmployerController } from './Employer.controller';

@Module({
  imports: [RepositoriesModule, EmployerHandleModule],
  controllers: [EmployerController],
})
export class EmployerModule {}
