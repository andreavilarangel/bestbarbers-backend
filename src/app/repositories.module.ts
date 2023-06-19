import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/infrastructure/database/database.module';
import { UserRepository } from './modules/User/User.repository';
import { BarbershopRepository } from './modules/Barbershop/Barbershop.repository';
import { ClientRepository } from './modules/Client/Client.repository';
import { EmployerRepository } from './modules/Employer/Employer.repository';
import { BarbershopOpeningHourRepository } from './modules/BarbershopOpeningHour/BarbershopOpeningHour.repository';
import { PaymentMethodRepository } from './modules/PaymentMethod/PaymentMethod.repository';
import { BlockedTimeRepository } from './modules/BlockedTime/BlockedTime.repository';
import { AddressRepository } from './modules/Address/Address.repository';
import { BarbershopClientRepository } from './modules/BarbershopClient/BarbershopClient.repository';
import { AppointmentRepository } from './modules/Appointment/Appointment.repository';
import { AppointmentProductAndServiceRepository } from './modules/AppointmentProductAndService/AppointmentProductAndService.repository';
import { EmployerProductAndServiceRepository } from './modules/EmployerProductAndService/EmployerProductAndService.repository';
import { ServiceRepository } from './modules/Service/Service.repository';
import { ProductRepository } from './modules/Product/Product.repository';

@Module({
  imports: [DatabaseModule],
  providers: [
    AddressRepository,
    UserRepository,
    BarbershopRepository,
    ClientRepository,
    EmployerRepository,
    BarbershopOpeningHourRepository,
    ServiceRepository,
    ProductRepository,
    PaymentMethodRepository,
    BlockedTimeRepository,
    BarbershopClientRepository,
    AppointmentRepository,
    AppointmentProductAndServiceRepository,
    EmployerProductAndServiceRepository,
  ],
  exports: [
    AddressRepository,
    UserRepository,
    BarbershopRepository,
    ClientRepository,
    EmployerRepository,
    BarbershopOpeningHourRepository,
    ServiceRepository,
    ProductRepository,
    PaymentMethodRepository,
    BlockedTimeRepository,
    BarbershopClientRepository,
    AppointmentRepository,
    AppointmentProductAndServiceRepository,
    EmployerProductAndServiceRepository,
  ],
})
export class RepositoriesModule {}
