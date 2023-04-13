import { Prisma } from '@prisma/client';
import { UserEntity } from 'src/core/entities/User.entity';
import {
  FindAllParamsType,
  FindAllResponseType,
} from 'src/shared/interfaces/FindAll.type';

export type UserRepositoryResponseType = UserEntity;

export interface UserRepositoryInterface {
  create(newUser: Prisma.UserCreateInput): Promise<UserRepositoryResponseType>;
  update(
    user_id: string,
    dataUser: Prisma.UserUpdateInput,
  ): Promise<UserRepositoryResponseType>;
  findOne(
    user_id?: string,
    username?: string,
  ): Promise<UserRepositoryResponseType>;
  findOneByEmail(email: string): Promise<UserRepositoryResponseType>;
  findOneByCellphone(phone: string): Promise<UserRepositoryResponseType>;
  findAll(
    params: FindAllParamsType<Prisma.UserWhereInput>,
  ): Promise<FindAllResponseType<Omit<UserRepositoryResponseType, 'password'>>>;
  delete(user_id: string): Promise<UserRepositoryResponseType>;
}
