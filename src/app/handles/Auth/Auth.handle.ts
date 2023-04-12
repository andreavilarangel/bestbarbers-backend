import { AuthPresenter } from 'src/app/presenter/Auth.presenter';
import { AuthHandleInterface } from './Auth.interface';

import { JwtService } from '@nestjs/jwt';
import { AuthPasswordWrongException } from 'src/app/errors/Auth.error';
import { Injectable } from '@nestjs/common';
import { UserHandle } from '../User/User.handle';
import { isEmail } from 'src/common/castHelper';
import { UserNotFoundException } from 'src/app/errors/User.error';
import { isMatch } from 'src/common/encrypt';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const md5 = require('md5');

@Injectable()
export class AuthHandle implements AuthHandleInterface {
  constructor(
    private readonly userHandle: UserHandle,
    private readonly jwtService: JwtService,
  ) {}

  async signIn(username: string, password: string): Promise<AuthPresenter> {
    const user = isEmail(username)
      ? await this.userHandle.findOneUserByEmail(username)
      : await this.userHandle.findOneUserByUsername(username);

    if (!user) throw new UserNotFoundException({ username });

    const isPasswordMatch = await isMatch(password, user.password);
    if (!isPasswordMatch) throw new AuthPasswordWrongException();

    const payload = {
      username,
      id: user.id,
    };
    const accessToken = this.jwtService.sign(payload);

    return {
      username,
      access_token: accessToken,
      user,
    };
  }
}
