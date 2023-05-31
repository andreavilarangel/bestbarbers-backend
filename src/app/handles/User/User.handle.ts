import { Injectable } from '@nestjs/common';
import { omit } from 'radash';
import {
  UserCreateDTO,
  UserUpdateDTO,
  // UserFindAllDTO,
} from 'src/app/modules/User/User.dto';
import {
  UserAlreadyExistException,
  UserNotFoundException,
} from 'src/app/modules/User/User.error';
import {
  UserPresenter,
  UserPresenterWithPassword,
} from 'src/app/modules/User/User.presenter';

import { UserRepository } from 'src/app/modules/User/User.repository';

@Injectable()
export class UserHandle {
  constructor(private readonly userRepository: UserRepository) {}

  async checkUserExist(
    email?: string,
    phone?: string,
  ): Promise<UserPresenterWithPassword> {
    let user = null;
    if (email) {
      user = this.userRepository.findOneByEmail(email);
    }
    if (phone) {
      user = this.userRepository.findOneByCellphone(phone);
    }
    return user;
  }

  async createOneUser(newUser: UserCreateDTO): Promise<UserPresenter> {
    const { email, phone } = newUser;

    const user = await this.checkUserExist(email, phone);
    if (user) throw new UserAlreadyExistException();

    const createdUser = await this.userRepository.create(newUser);
    return omit(createdUser, ['password']);
  }

  async updateOneUser(
    user_id: string,
    dataUser: UserUpdateDTO,
  ): Promise<UserPresenter> {
    // valida se usuario existe
    await this.findOneUserById(user_id);

    const userUpdated = await this.userRepository.update(user_id, {
      ...dataUser,
    });

    return omit(userUpdated, ['password']);
  }

  async findOneUserById(user_id: string): Promise<UserPresenter> {
    const user = await this.userRepository.findOne(user_id);
    if (!user) throw new UserNotFoundException();

    return omit(user, ['password']);
  }

  async findOneUserByPhone(phone: string): Promise<UserPresenterWithPassword> {
    return this.userRepository.findOneByCellphone(phone);
  }

  async findOneUserByEmail(email: string): Promise<UserPresenterWithPassword> {
    return this.userRepository.findOneByEmail(email);
  }

  // async findAllUser(
  //   params: UserFindAllDTO,
  // ): Promise<FindAllPresent<UserPresenter>> {
  //   return this.userFind.findAllUser(params);
  // }
}
