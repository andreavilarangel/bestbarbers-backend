import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/infrastructure/database/database.module';
import { UserRepository } from './User.repository';
import { BarbershopRepository } from './Barbershop.repository';
import { ClientRepository } from './Client.repository';
import { EmployerRepository } from './Employer.repository';
import { BarbershopOpeningHourRepository } from './BarbershopOpeningHour.repository';

@Module({
  imports: [DatabaseModule],
  providers: [
    UserRepository,
    BarbershopRepository,
    ClientRepository,
    EmployerRepository,
    BarbershopOpeningHourRepository,
  ],
  exports: [
    UserRepository,
    BarbershopRepository,
    ClientRepository,
    EmployerRepository,
    BarbershopOpeningHourRepository,
  ],
})
export class RepositoriesModule {}
