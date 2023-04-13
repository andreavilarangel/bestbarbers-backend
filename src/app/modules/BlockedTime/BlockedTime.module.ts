
import { Module } from '@nestjs/common'
import { BlockedTimeHandleModule } from 'src/app/handles/BlockedTime/BlockedTimeHandle.module'
import { RepositoriesModule } from 'src/core/repositories/repositories.module'
import { BlockedTimeController } from './BlockedTime.controller'

@Module({
  imports: [RepositoriesModule, BlockedTimeHandleModule],
  controllers: [BlockedTimeController],
})
export class BlockedTimeModule {}
