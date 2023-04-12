import { Injectable } from '@nestjs/common';
import { omit } from 'radash';
import { UserFindAllDTO } from 'src/app/dtos/User.dto';
import { UserNotFoundException } from 'src/app/errors/User.error';
import { FindAllPresent } from 'src/app/presenter/FindAll.presenter';
import {
  UserPresenter,
  UserPresenterWithPassword,
} from 'src/app/presenter/User.presenter';
import { UserRepository } from 'src/core/repositories/User.repository';
import { UserFindServiceInterface } from './UserHandle.interface';

@Injectable()
export class UserFindService implements UserFindServiceInterface {
  constructor(private readonly userRepository: UserRepository) {}

  async findOneUserById(userId: string): Promise<UserPresenter> {
    const user = await this.userRepository.findOne(userId);
    if (!user) throw new UserNotFoundException();

    return omit(user, ['password']);
  }

  async findOneUserByPhone(phone: string): Promise<UserPresenterWithPassword> {
    return this.userRepository.findOneByCellphone(phone);
  }

  async findOneUserByEmail(email: string): Promise<UserPresenterWithPassword> {
    return this.userRepository.findOneByEmail(email);
  }

  async findAllUser(
    params: UserFindAllDTO,
  ): Promise<FindAllPresent<UserPresenter>> {
    const [data, total] = await this.userRepository.findAll({
      skip: params.skip,
      take: params.take,
      where: {
        email: { contains: params.email, mode: 'insensitive' },
      },
    });

    return {
      data,
      total,
    };
  }
}
