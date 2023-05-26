import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/infrastructure/database/database.module';
import { UserRepository } from './modules/User/User.repository';
import { BarbershopRepository } from './modules/Barbershop/Barbershop.repository';
import { ClientRepository } from './modules/Client/Client.repository';
import { EmployerRepository } from './modules/Employer/Employer.repository';
import { BarbershopOpeningHourRepository } from './modules/BarbershopOpeningHour/BarbershopOpeningHour.repository';
import { ProductAndServiceRepository } from './modules/ProductAndService/ProductAndService.repository';
import { PaymentMethodRepository } from './modules/PaymentMethod/PaymentMethod.repository';
import { BlockedTimeRepository } from './modules/BlockedTime/BlockedTime.repository';
import { AddressRepository } from './modules/Address/Address.repository';

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
