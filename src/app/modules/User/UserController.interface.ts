import {
  UserCreateDTO,
  UserUpdateDTO,
  // UserFindAllDTO,
} from 'src/app/dtos/User.dto';
import { UserPresenter } from 'src/app/presenter/User.presenter';
import { FindAllPresent } from 'src/app/presenter/FindAll.presenter';

export type UserPresenterResponse = Omit<UserPresenter, 'password'>;
export interface UserControllerInterface {
  createOneUser(newUser: UserCreateDTO): Promise<UserPresenterResponse>;
  updateOneUser(
    user_id: string,
    dataUser: UserUpdateDTO,
  ): Promise<UserPresenterResponse>;
  getOneUserById(user_id: string): Promise<UserPresenterResponse>;
  // getAllUser(
  //   queries: UserFindAllDTO,
  // ): Promise<FindAllPresent<UserPresenterResponse>>;
}
