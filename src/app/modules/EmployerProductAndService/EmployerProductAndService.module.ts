import { Module } from '@nestjs/common';
import { EmployerProductAndServiceHandleModule } from 'src/app/handles/EmployerProductAndService/EmployerProductAndServiceHandle.module';
import { RepositoriesModule } from 'src/app/repositories.module';
import { EmployerProductAndServiceController } from './EmployerProductAndService.controller';

@Module({
  imports: [RepositoriesModule, EmployerProductAndServiceHandleModule],
  controllers: [EmployerProductAndServiceController],
})
export class EmployerProductAndServiceModule {}
