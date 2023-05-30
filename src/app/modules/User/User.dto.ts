import { OmitType, PartialType, ApiProperty } from '@nestjs/swagger';
import { UserEntity } from 'src/app/modules/User/User.entity';
import { PaginationDTO } from '../../../shared/Pagination.dto';
import { Transform } from 'class-transformer';
import { encrypt } from 'src/common/encrypt';

export class UserCreateDTO extends OmitType(UserEntity, [
  'id',
  'created_at',
  'updated_at',
  'inactive',
]) {
  @ApiProperty({ example: 'senha123456' })
  @Transform(encrypt)
  password: string;
}

export class UserUpdateDTO extends PartialType(UserCreateDTO) {}

export class UserhopFindAllDTO extends PaginationDTO {}
