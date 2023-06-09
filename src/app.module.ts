import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './app/handles/Auth/jwt-auth.guard';
import { AuthModule } from './app/modules/Auth/Auth.module';
import { UserModule } from './app/modules/User/User.module';
import { BarbershopModule } from './app/modules/Barbershop/Barbershop.module';
import { ClientModule } from './app/modules/Client/Client.module';
import { EmployerModule } from './app/modules/Employer/Employer.module';
import { BarbershopOpeningHourModule } from './app/modules/BarbershopOpeningHour/BarbershopOpeningHour.module';
import { PaymentMethodModule } from './app/modules/PaymentMethod/PaymentMethod.module';
import { BlockedTimeModule } from './app/modules/BlockedTime/BlockedTime.module';
import { AddressModule } from './app/modules/Address/Address.module';
import { BarbershopClientModule } from './app/modules/BarbershopClient/BarbershopClient.module';
import { AppointmentModule } from './app/modules/Appointment/Appointment.module';
import { EmployerProductAndServiceModule } from './app/modules/EmployerProductAndService/EmployerProductAndService.module';
import { ProductModule } from './app/modules/Product/Product.module';
import { ServiceModule } from './app/modules/Service/Service.module';

@Module({
  imports: [
    AuthModule,
    UserModule,
    AddressModule,
    BarbershopModule,
    ClientModule,
    EmployerModule,
    BarbershopOpeningHourModule,
    ProductModule,
    ServiceModule,
    PaymentMethodModule,
    BlockedTimeModule,
    BarbershopClientModule,
    AppointmentModule,
    EmployerProductAndServiceModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
})
export class AppModule {}
