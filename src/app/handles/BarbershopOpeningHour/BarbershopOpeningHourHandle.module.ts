import { Module } from '@nestjs/common';
import { RepositoriesModule } from 'src/core/repositories/repositories.module';
import { BarbershopOpeningHourHandle } from './BarbershopOpeningHour.handle';
import { BarbershopOpeningHourCreateService } from './BarbershopOpeningHourCreate.service';
import { BarbershopOpeningHourFindService } from './BarbershopOpeningHourFind.service';
import { BarbershopOpeningHourUpdateService } from './BarbershopOpeningHourUpdate.service';

@Module({
  imports: [RepositoriesModule],
  providers: [
    BarbershopOpeningHourHandle,
    BarbershopOpeningHourCreateService,
    BarbershopOpeningHourUpdateService,
    BarbershopOpeningHourFindService,
  ],
  exports: [
    BarbershopOpeningHourHandle,
    BarbershopOpeningHourCreateService,
    BarbershopOpeningHourUpdateService,
    BarbershopOpeningHourFindService,
  ],
})
export class BarbershopOpeningHourHandleModule {}
