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
    userId: string,
    dataUser: Prisma.UserUpdateInput,
  ): Promise<UserRepositoryResponseType>;
  findOne(
    userId?: string,
    username?: string,
  ): Promise<UserRepositoryResponseType>;
  findOneByEmail(email: string): Promise<UserRepositoryResponseType>;
  findOneByCellphone(phone: string): Promise<UserRepositoryResponseType>;
  findAll(
    params: FindAllParamsType<Prisma.UserWhereInput>,
  ): Promise<FindAllResponseType<Omit<UserRepositoryResponseType, 'password'>>>;
  delete(userId: string): Promise<UserRepositoryResponseType>;
}
