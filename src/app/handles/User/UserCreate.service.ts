import { Injectable } from '@nestjs/common';
import { omit } from 'radash';
import { UserCreateDTO } from 'src/app/dtos/User.dto';
import { UserAlreadyExistException } from 'src/app/errors/User.error';
import { UserPresenter } from 'src/app/presenter/User.presenter';
import { UserRepository } from 'src/core/repositories/User.repository';
import { UserFindService } from './UserFind.service';
import { UserCreateServiceInterface } from './UserHandle.interface';

@Injectable()
export class UserCreateService implements UserCreateServiceInterface {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly userFind: UserFindService,
  ) {}

  async createOneUser(newUser: UserCreateDTO): Promise<UserPresenter> {
    const { email, phone } = newUser;

    const userFoundByEmail = await this.userFind.findOneUserByEmail(email);
    if (userFoundByEmail) throw new UserAlreadyExistException({ email });

    const userFoundByCellphone = await this.userRepository.findOneByCellphone(
      phone,
    );
    if (userFoundByCellphone) throw new UserAlreadyExistException({ phone });

    const createdUser = await this.userRepository.create({
      ...newUser,
    });

    return omit(createdUser, ['password']);
  }
}
