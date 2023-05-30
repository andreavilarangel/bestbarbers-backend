import { ApiProperty, OmitType, PartialType } from '@nestjs/swagger';
import { ClientEntity } from 'src/app/modules/Client/Client.entity';
import { PaginationDTO } from '../../../shared/Pagination.dto';
import { Type } from 'class-transformer';
import { IsNotEmptyObject, IsOptional, ValidateNested } from 'class-validator';
import { UserCreateDTO, UserUpdateDTO } from '../User/User.dto';

export class ClientCreateDTO extends OmitType(ClientEntity, [
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

export class ClientUpdateDTO extends PartialType(
  OmitType(ClientEntity, ['id']),
) {
  @ApiProperty({ type: UserUpdateDTO })
  @IsOptional()
  @Type(() => UserUpdateDTO)
  user: UserUpdateDTO;
}

export class ClientFindAllDTO extends PaginationDTO {}
