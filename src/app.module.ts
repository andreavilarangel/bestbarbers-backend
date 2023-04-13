import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './app/handles/Auth/jwt-auth.guard';
import { AuthModule } from './app/modules/Auth/Auth.module';
import { UserModule } from './app/modules/User/User.module';

@Module({
  imports: [AuthModule, UserModule],
  controllers: [],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
})
export class AppModule {}
