import { Module } from '@nestjs/common';
import { ProductHandleModule } from 'src/app/handles/Product/ProductHandle.module';
import { RepositoriesModule } from 'src/app/repositories.module';
import { ProductController } from './Product.controller';

@Module({
  imports: [RepositoriesModule, ProductHandleModule],
  controllers: [ProductController],
})
export class ProductModule {}
