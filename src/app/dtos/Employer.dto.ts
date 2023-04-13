import { ApiProperty, OmitType, PartialType } from '@nestjs/swagger';
import { EmployerEntity } from 'src/core/entities/Employer.entity';
import { PaginationDTO } from './Pagination.dto';
import { Type } from 'class-transformer';
import { IsNotEmptyObject, IsOptional, ValidateNested } from 'class-validator';
import { UserCreateDTO, UserUpdateDTO } from './User.dto';

export class EmployerCreateDTO extends OmitType(EmployerEntity, [
  'id',
  'created_at',
  'updated_at',
  'inactive',
]) {
  @ApiProperty({ type: UserCreateDTO })
  @IsNotEmptyObject()
  @ValidateNested()
  @Type(() => UserCreateDTO)
  user: UserCreateDTO;
}

export class EmployerUpdateDTO extends PartialType(
  OmitType(EmployerEntity, ['id']),
) {
  @ApiProperty({ type: UserUpdateDTO })
  @IsOptional()
  @Type(() => UserUpdateDTO)
  user: UserUpdateDTO;
}

export class EmployerFindAllDTO extends PaginationDTO {}
