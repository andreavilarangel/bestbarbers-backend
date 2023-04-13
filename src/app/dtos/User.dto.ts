import { OmitType, PartialType } from '@nestjs/swagger';
import { UserEntity } from 'src/core/entities/User.entity';
import { PaginationDTO } from './Pagination.dto';

export class UserCreateDTO extends OmitType(UserEntity, [
  'id',
  'created_at',
  'updated_at',
  'inactive',
]) {}

export class UserUpdateDTO extends PartialType(UserCreateDTO) {}

export class UserhopFindAllDTO extends PaginationDTO {}
