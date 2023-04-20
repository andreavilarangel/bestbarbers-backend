import { AuthPresenter } from 'src/app/presenter/Auth.presenter';
import { AuthHandleInterface } from './Auth.interface';

import { JwtService } from '@nestjs/jwt';
import { AuthPasswordWrongException } from 'src/app/errors/Auth.error';
import { Injectable } from '@nestjs/common';
import { UserHandle } from '../User/User.handle';
import { BarbershopHandle } from '../Barbershop/Barbershop.handle';
import { isEmail } from 'src/common/castHelper';
import { UserNotFoundException } from 'src/app/errors/User.error';
import { isMatch } from 'src/common/encrypt';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const md5 = require('md5');

@Injectable()
export class AuthHandle implements AuthHandleInterface {
  constructor(
    private readonly userHandle: UserHandle,
    private readonly barbershopHandle: BarbershopHandle,
    private readonly jwtService: JwtService,
  ) {}

  async signIn(user: string, password: string): Promise<AuthPresenter> {
    const checkUser = isEmail(user)
      ? await this.userHandle.findOneUserByEmail(user)
      : await this.userHandle.findOneUserByPhone(user);

    if (!checkUser) throw new UserNotFoundException({ user });

    const isPasswordMatch = await isMatch(password, checkUser.password);
    if (!isPasswordMatch) throw new AuthPasswordWrongException();

    const barbershop = await this.barbershopHandle.findOneBarbershopByUserId(
      checkUser.id,
    );

    const payload = {
      user,
      id: checkUser.id,
    };
    const accessToken = this.jwtService.sign(payload);

    return {
      token: accessToken,
      user: checkUser,
      barbershop,
    };
  }
}
