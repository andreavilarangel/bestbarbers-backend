import { AuthPresenter } from 'src/app/modules/Auth/Auth.presenter';

import { JwtService } from '@nestjs/jwt';
import { AuthPasswordWrongException } from 'src/app/errors/Auth.error';
import { Injectable } from '@nestjs/common';
import { UserHandle } from '../User/User.handle';
import { BarbershopHandle } from '../Barbershop/Barbershop.handle';
import { UserNotFoundException } from 'src/app/errors/User.error';
import { isMatch } from 'src/common/encrypt';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const md5 = require('md5');

@Injectable()
export class AuthHandle {
  constructor(
    private readonly userHandle: UserHandle,
    private readonly barbershopHandle: BarbershopHandle,
    private readonly jwtService: JwtService,
  ) {}

  async signIn(user: string, password: string): Promise<AuthPresenter> {
    const [checkByEmail, checkByPhone] = await Promise.all([
      await this.userHandle.findOneUserByEmail(user),
      await this.userHandle.findOneUserByPhone(user),
    ]);
    const checkUser = checkByEmail || checkByPhone;

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
