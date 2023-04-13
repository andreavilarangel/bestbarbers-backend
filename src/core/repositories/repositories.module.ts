import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/infrastructure/database/database.module';
import { UserRepository } from './User.repository';
import { BarbershopRepository } from './Barbershop.repository';
import { ClientRepository } from './Client.repository';

@Module({
  imports: [DatabaseModule],
  providers: [UserRepository, BarbershopRepository, ClientRepository],
  exports: [UserRepository, BarbershopRepository, ClientRepository],
})
export class RepositoriesModule {}
