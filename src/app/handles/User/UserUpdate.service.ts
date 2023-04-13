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
    user_id: string,
    dataUser: UserUpdateDTO,
  ): Promise<UserPresenter> {
    // valida se usuario existe
    await this.userFind.findOneUserById(user_id);

    const userUpdated = await this.userRepository.update(user_id, {
      ...dataUser,
    });

    return omit(userUpdated, ['password']);
  }
}
