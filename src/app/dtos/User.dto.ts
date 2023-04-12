import {
  ApiProperty,
  IntersectionType,
  OmitType,
  PartialType,
  PickType,
} from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { encrypt } from 'src/common/encrypt';
import { UserEntity } from 'src/core/entities/User.entity';
import { PaginationDTO } from './Pagination.dto';
import { IsNotEmptyObject, ValidateNested } from 'class-validator';

export class UserCreateDTO extends OmitType(UserEntity, ['id']) {
  @IsNotEmptyObject()
  @ValidateNested()
  @ApiProperty({ example: 'senha123456' })
  @Transform(encrypt)
  password: string;
}

export class UserUpdateDTO extends PartialType(UserEntity) {}

export class UserUpdateWithoutPasswordDTO extends PartialType(
  OmitType(UserEntity, ['password']),
) {}

export class UserFindAllDTO extends IntersectionType(
  PaginationDTO,
  PartialType(
    IntersectionType(
      PickType(UserEntity, ['email']),
      PickType(UserEntity, ['phone']),
    ),
  ),
) {}
