import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/infrastructure/database/database.module';
import { UserRepository } from './User.repository';
import { BarbershopRepository } from './Barbershop.repository';

@Module({
  imports: [DatabaseModule],
  providers: [UserRepository, BarbershopRepository],
  exports: [UserRepository, BarbershopRepository],
})
export class RepositoriesModule {}
