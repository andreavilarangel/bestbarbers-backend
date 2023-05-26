import { Module } from '@nestjs/common';
import { ProductAndServiceHandleModule } from 'src/app/handles/ProductAndService/ProductAndServiceHandle.module';
import { RepositoriesModule } from 'src/app/repositories.module';
import { ProductAndServiceController } from './ProductAndService.controller';

@Module({
  imports: [RepositoriesModule, ProductAndServiceHandleModule],
  controllers: [ProductAndServiceController],
})
export class ProductAndServiceModule {}
