import {
  UserCreateDTO,
  UserFindAllDTO,
  UserUpdateDTO,
} from 'src/app/dtos/User.dto';
import { FindAllPresent } from 'src/app/presenter/FindAll.presenter';
import {
  UserPresenter,
  UserPresenterWithPassword,
} from 'src/app/presenter/User.presenter';

export interface UserCreateServiceInterface {
  createOneUser(newUser: UserCreateDTO): Promise<UserPresenter>;
}

export interface UserUpdateServiceInterface {
  updateOneUser(
    userId: string,
    dataUser: UserUpdateDTO,
  ): Promise<UserPresenter>;
}

export interface UserFindServiceInterface {
  findOneUserById(userId: string): Promise<UserPresenter>;
  findOneUserByPhone(phone: string): Promise<UserPresenterWithPassword>;
  findOneUserByEmail(email: string): Promise<UserPresenterWithPassword>;
  findAllUser(params: UserFindAllDTO): Promise<FindAllPresent<UserPresenter>>;
}

export interface UserHandleInterface
  extends UserCreateServiceInterface,
    UserUpdateServiceInterface,
    UserFindServiceInterface {}
