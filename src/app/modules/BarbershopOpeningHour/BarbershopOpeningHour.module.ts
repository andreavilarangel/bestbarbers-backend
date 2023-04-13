import { Module } from '@nestjs/common';
import { BarbershopOpeningHourHandleModule } from 'src/app/handles/BarbershopOpeningHour/BarbershopOpeningHourHandle.module';
import { RepositoriesModule } from 'src/core/repositories/repositories.module';
import { BarbershopOpeningHourController } from './BarbershopOpeningHour.controller';

@Module({
  imports: [RepositoriesModule, BarbershopOpeningHourHandleModule],
  controllers: [BarbershopOpeningHourController],
})
export class BarbershopOpeningHourModule {}
