import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/infrastructure/database/database.module';
import { UserRepository } from '../../app/modules/User/User.repository';
import { BarbershopRepository } from '../../app/modules/Barbershop/Barbershop.repository';
import { ClientRepository } from '../../app/modules/Client/Client.repository';
import { EmployerRepository } from '../../app/modules/Employer/Employer.repository';
import { BarbershopOpeningHourRepository } from '../../app/modules/BarbershopOpeningHour/BarbershopOpeningHour.repository';
import { ProductAndServiceRepository } from '../../app/modules/ProductAndService/ProductAndService.repository';
import { PaymentMethodRepository } from '../../app/modules/PaymentMethod/PaymentMethod.repository';
import { BlockedTimeRepository } from '../../app/modules/BlockedTime/BlockedTime.repository';
import { AddressRepository } from '../../app/modules/Address/Address.repository';

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
