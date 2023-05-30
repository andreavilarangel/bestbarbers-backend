import { ApiProperty, OmitType, PartialType } from '@nestjs/swagger';
import { PaginationDTO } from '../../../shared/Pagination.dto';
import { BarbershopClientEntity } from 'src/app/modules/BarbershopClient/BarbershopClient.entity';
import { IsNotEmptyObject, ValidateNested } from 'class-validator';
import { UserCreateDTO } from '../User/User.dto';
import { Type } from 'class-transformer';

export class BarbershopClientCreateDTO extends OmitType(
  BarbershopClientEntity,
  ['id', 'created_at', 'updated_at'],
) {
  @ApiProperty({ type: UserCreateDTO })
  @IsNotEmptyObject()
  @ValidateNested()
  @Type(() => UserCreateDTO)
  user: UserCreateDTO;
}

export class BarbershopClientUpdateDTO extends PartialType(
  BarbershopClientCreateDTO,
) {}

export class BarbershopClientFindAllDTO extends PaginationDTO {}
