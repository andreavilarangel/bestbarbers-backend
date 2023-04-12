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
    userId: string,
    dataUser: Prisma.UserUpdateInput,
  ): Promise<UserRepositoryResponseType> {
    return this.prisma.user.update({
      where: {
        id: userId,
      },
      data: dataUser,
    });
  }

  async findOne(userId?: string): Promise<UserRepositoryResponseType> {
    return this.prisma.user.findUnique({
      where: {
        id: userId || undefined,
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

  async delete(userId: string): Promise<UserRepositoryResponseType> {
    return this.prisma.user.delete({
      where: {
        id: userId,
      },
    });
  }
}