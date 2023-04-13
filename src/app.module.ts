import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './app/handles/Auth/jwt-auth.guard';
import { AuthModule } from './app/modules/Auth/Auth.module';
import { UserModule } from './app/modules/User/User.module';
import { BarbershopModule } from './app/modules/Barbershop/Barbershop.module';
import { ClientModule } from './app/modules/Client/Client.module';

@Module({
  imports: [AuthModule, UserModule, BarbershopModule, ClientModule],
  controllers: [],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
})
export class AppModule {}
