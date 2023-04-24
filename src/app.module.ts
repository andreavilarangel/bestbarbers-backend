import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './app/handles/Auth/jwt-auth.guard';
import { AuthModule } from './app/modules/Auth/Auth.module';
import { UserModule } from './app/modules/User/User.module';
import { BarbershopModule } from './app/modules/Barbershop/Barbershop.module';
import { ClientModule } from './app/modules/Client/Client.module';
import { EmployerModule } from './app/modules/Employer/Employer.module';
import { BarbershopOpeningHourModule } from './app/modules/BarbershopOpeningHour/BarbershopOpeningHour.module';
import { ProductAndServiceModule } from './app/modules/ProductAndService/ProductAndService.module';
import { PaymentMethodModule } from './app/modules/PaymentMethod/PaymentMethod.module';
import { BlockedTimeModule } from './app/modules/BlockedTime/BlockedTime.module';
import { AddressModule } from './app/modules/Address/Address.module';

@Module({
  imports: [
    AddressModule,
    AuthModule,
    UserModule,
    BarbershopModule,
    ClientModule,
    EmployerModule,
    BarbershopOpeningHourModule,
    ProductAndServiceModule,
    PaymentMethodModule,
    BlockedTimeModule,
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
