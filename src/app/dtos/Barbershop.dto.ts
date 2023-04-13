import { ApiProperty, OmitType, PartialType } from '@nestjs/swagger';
import { BarbershopEntity } from 'src/core/entities/Barbershop.entity';
import { PaginationDTO } from './Pagination.dto';
import { Type } from 'class-transformer';
import { IsNotEmptyObject, IsOptional, ValidateNested } from 'class-validator';
import { UserCreateDTO, UserUpdateDTO } from './User.dto';

export class BarbershopCreateDTO extends OmitType(BarbershopEntity, [
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

export class BarbershopUpdateDTO extends PartialType(
  OmitType(BarbershopEntity, ['id']),
) {
  @ApiProperty({ type: UserUpdateDTO })
  @IsOptional()
  @Type(() => UserUpdateDTO)
  user: UserUpdateDTO;
}

export class BarbershopFindAllDTO extends PaginationDTO {}
