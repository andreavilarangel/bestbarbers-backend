import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/infrastructure/database/database.module';
import { UserRepository } from './User.repository';
import { BarbershopRepository } from './Barbershop.repository';
import { ClientRepository } from './Client.repository';
import { EmployerRepository } from './Employer.repository';
import { BarbershopOpeningHourRepository } from './BarbershopOpeningHour.repository';
import { ProductAndServiceRepository } from './ProductAndService.repository';
import { PaymentMethodRepository } from './PaymentMethod.repository';
import { BlockedTimeRepository } from './BlockedTime.repository';
import { AddressRepository } from './Address.repository';

@Module({
  imports: [DatabaseModule],
  providers: [
    AddressRepository,
    UserRepository,
    BarbershopRepository,
    ClientRepository,
    EmployerRepository,
    BarbershopOpeningHourRepository,
    ProductAndServiceRepository,
    PaymentMethodRepository,
    BlockedTimeRepository,
  ],
  exports: [
    AddressRepository,
    UserRepository,
    BarbershopRepository,
    ClientRepository,
    EmployerRepository,
    BarbershopOpeningHourRepository,
    ProductAndServiceRepository,
    PaymentMethodRepository,
    BlockedTimeRepository,
  ],
})
export class RepositoriesModule {}
