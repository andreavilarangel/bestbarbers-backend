import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/infrastructure/database/prisma/prisma.service';
import {
  FindAllParamsType,
  FindAllResponseType,
} from 'src/shared/interfaces/FindAll.type';
import {
  UserRepositoryInterface,
  UserRepositoryResponseType,
} from './interface/UserRepository.interface';

@Injectable()
export class UserRepository implements UserRepositoryInterface {
  constructor(private readonly prisma: PrismaService) {}

  async create(
    newUser: Prisma.UserCreateInput,
  ): Promise<UserRepositoryResponseType> {
    return this.prisma.user.create({
      data: newUser,
    });
  }

  async update(
    user_id: string,
    dataUser: Prisma.UserUpdateInput,
  ): Promise<UserRepositoryResponseType> {
    return this.prisma.user.update({
      where: {
        id: user_id,
      },
      data: dataUser,
    });
  }

  async findOne(user_id?: string): Promise<UserRepositoryResponseType> {
    return this.prisma.user.findUnique({
      where: {
        id: user_id || undefined,
      },
    });
  }

  async findOneByCellphone(phone: string): Promise<UserRepositoryResponseType> {
    return this.prisma.user.findFirst({
      where: { phone },
    });
  }

  async findOneByEmail(email: string): Promise<UserRepositoryResponseType> {
    return this.prisma.user.findFirst({
      where: { email },
    });
  }

  async findAll(
    params: FindAllParamsType<Prisma.UserWhereInput>,
  ): Promise<
    FindAllResponseType<Omit<UserRepositoryResponseType, 'password'>>
  > {
    return this.prisma.$transaction([
      this.prisma.user.findMany({
        skip: params.skip,
        take: params.take,
        where: params.where,
        select: {
          ...this.prisma.$excludeSelectFields('user', ['password']),
        },
      }),
      this.prisma.user.count({ where: params.where }),
    ]);
  }

  async delete(user_id: string): Promise<UserRepositoryResponseType> {
    return this.prisma.user.delete({
      where: {
        id: user_id,
      },
    });
  }
}
