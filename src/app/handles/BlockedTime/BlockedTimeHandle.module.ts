import { Module } from '@nestjs/common';
import { RepositoriesModule } from 'src/core/repositories/repositories.module';
import { BlockedTimeHandle } from './BlockedTime.handle';
import { BlockedTimeCreateService } from './BlockedTimeCreate.service';
import { BlockedTimeFindService } from './BlockedTimeFind.service';
import { BlockedTimeUpdateService } from './BlockedTimeUpdate.service';
import { BarbershopFindService } from '../Barbershop/BarbershopFind.service';

@Module({
  imports: [RepositoriesModule],
  providers: [
    BlockedTimeHandle,
    BlockedTimeCreateService,
    BlockedTimeUpdateService,
    BlockedTimeFindService,
    BarbershopFindService,
  ],
  exports: [
    BlockedTimeHandle,
    BlockedTimeCreateService,
    BlockedTimeUpdateService,
    BlockedTimeFindService,
  ],
})
export class BlockedTimeHandleModule {}
