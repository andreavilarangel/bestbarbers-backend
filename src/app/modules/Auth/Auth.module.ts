import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthHandle } from 'src/app/handles/Auth/Auth.handle';
import { JwtStrategy } from 'src/app/handles/Auth/jwt.strategy';
import { UserHandleModule } from 'src/app/handles/User/UserHandle.module';
import { RepositoriesModule } from 'src/core/repositories/repositories.module';
import { AuthController } from './Auth.controller';

@Module({
  imports: [
    RepositoriesModule,
    UserHandleModule,
    JwtModule.register({
      secret: process.env.SECRETE_JWT_KEY,
      signOptions: { expiresIn: '1000000s' },
    }),
  ],
  providers: [AuthHandle, JwtStrategy],
  controllers: [AuthController],
})
export class AuthModule {}
