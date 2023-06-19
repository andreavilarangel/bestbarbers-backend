import { Module } from '@nestjs/common';
import { ServiceHandleModule } from 'src/app/handles/Service/ServiceHandle.module';
import { RepositoriesModule } from 'src/app/repositories.module';
import { ServiceController } from './Service.controller';

@Module({
  imports: [RepositoriesModule, ServiceHandleModule],
  controllers: [ServiceController],
})
export class ServiceModule {}
