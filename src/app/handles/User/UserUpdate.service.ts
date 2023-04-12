import { Injectable } from '@nestjs/common';
import { omit } from 'radash';
import { UserUpdateDTO } from 'src/app/dtos/User.dto';
import { UserPresenter } from 'src/app/presenter/User.presenter';
import { UserRepository } from 'src/core/repositories/User.repository';
import { UserFindService } from './UserFind.service';
import { UserUpdateServiceInterface } from './UserHandle.interface';

@Injectable()
export class UserUpdateService implements UserUpdateServiceInterface {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly userFind: UserFindService,
  ) {}

  async updateOneUser(
    userId: string,
    dataUser: UserUpdateDTO,
  ): Promise<UserPresenter> {
    // valida se usuario existe
    await this.userFind.findOneUserById(userId);

    const userUpdated = await this.userRepository.update(userId, {
      ...dataUser,
    });

    return omit(userUpdated, ['password']);
  }
}
