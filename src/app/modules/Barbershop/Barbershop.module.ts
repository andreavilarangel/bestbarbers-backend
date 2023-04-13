import { Module } from '@nestjs/common';
import { BarbershopHandleModule } from 'src/app/handles/Barbershop/BarbershopHandle.module';
import { RepositoriesModule } from 'src/core/repositories/repositories.module';
import { BarbershopController } from './Barbershop.controller';

@Module({
  imports: [RepositoriesModule, BarbershopHandleModule],
  controllers: [BarbershopController],
})
export class BarbershopModule {}
