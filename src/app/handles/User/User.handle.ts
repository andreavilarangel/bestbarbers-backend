import { Injectable } from '@nestjs/common';
import {
  UserCreateDTO,
  UserUpdateDTO,
  // UserFindAllDTO,
} from 'src/app/dtos/User.dto';
import { FindAllPresent } from 'src/app/presenter/FindAll.presenter';
import {
  UserPresenter,
  UserPresenterWithPassword,
} from 'src/app/presenter/User.presenter';
import { UserCreateService } from './UserCreate.service';
import { UserFindService } from './UserFind.service';
import { UserHandleInterface } from './UserHandle.interface';
import { UserUpdateService } from './UserUpdate.service';

@Injectable()
export class UserHandle implements UserHandleInterface {
  constructor(
    private readonly userCreate: UserCreateService,
    private readonly userUpdate: UserUpdateService,
    private readonly userFind: UserFindService,
  ) {}

  async createOneUser(newUser: UserCreateDTO): Promise<UserPresenter> {
    return this.userCreate.createOneUser(newUser);
  }

  async updateOneUser(
    user_id: string,
    dataUser: UserUpdateDTO,
  ): Promise<UserPresenter> {
    return this.userUpdate.updateOneUser(user_id, dataUser);
  }

  async findOneUserById(user_id: string): Promise<UserPresenter> {
    return this.userFind.findOneUserById(user_id);
  }

  async findOneUserByPhone(phone: string): Promise<UserPresenterWithPassword> {
    return this.userFind.findOneUserByPhone(phone);
  }

  async findOneUserByEmail(email: string): Promise<UserPresenterWithPassword> {
    return this.userFind.findOneUserByEmail(email);
  }

  // async findAllUser(
  //   params: UserFindAllDTO,
  // ): Promise<FindAllPresent<UserPresenter>> {
  //   return this.userFind.findAllUser(params);
  // }
}
