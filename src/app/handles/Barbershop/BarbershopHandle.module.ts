import { Module } from '@nestjs/common'
import { RepositoriesModule } from 'src/core/repositories/repositories.module'
import { BarbershopHandle } from './Barbershop.handle'
import { BarbershopCreateService } from './BarbershopCreate.service'
import { BarbershopFindService } from './BarbershopFind.service'
import { BarbershopUpdateService } from './BarbershopUpdate.service'

@Module({
  imports: [RepositoriesModule],
  providers: [
    BarbershopHandle,
    BarbershopCreateService,
    BarbershopUpdateService,
    BarbershopFindService,
  ],
  exports: [BarbershopHandle, BarbershopCreateService, BarbershopUpdateService, BarbershopFindService],
})
export class BarbershopHandleModule {}
