import { Module } from '@nestjs/common';
import { RepositoriesModule } from 'src/core/repositories/repositories.module';
import { ProductAndServiceHandle } from './ProductAndService.handle';
import { ProductAndServiceCreateService } from './ProductAndServiceCreate.service';
import { ProductAndServiceFindService } from './ProductAndServiceFind.service';
import { ProductAndServiceUpdateService } from './ProductAndServiceUpdate.service';
import { BarbershopFindService } from '../Barbershop/BarbershopFind.service';

@Module({
  imports: [RepositoriesModule],
  providers: [
    ProductAndServiceHandle,
    ProductAndServiceCreateService,
    ProductAndServiceUpdateService,
    ProductAndServiceFindService,
    BarbershopFindService,
  ],
  exports: [
    ProductAndServiceHandle,
    ProductAndServiceCreateService,
    ProductAndServiceUpdateService,
    ProductAndServiceFindService,
  ],
})
export class ProductAndServiceHandleModule {}
