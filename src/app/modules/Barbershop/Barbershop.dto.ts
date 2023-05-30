import { ApiProperty, OmitType, PartialType } from '@nestjs/swagger';
import { BarbershopEntity } from 'src/app/modules/Barbershop/Barbershop.entity';
import { PaginationDTO } from '../../../shared/Pagination.dto';
import { Type } from 'class-transformer';
import { IsNotEmptyObject, IsOptional, ValidateNested } from 'class-validator';
import { UserCreateDTO, UserUpdateDTO } from '../User/User.dto';

export class BarbershopCreateDTO extends OmitType(BarbershopEntity, [
  'id',
  'created_at',
  'updated_at',
  'inactive',
]) {
  @ApiProperty({
    type: UserCreateDTO,
    example: {
      name: 'Nome da barbearia',
      user: {
        name: 'Nome do responsavel',
        phone: '5531994194304',
        email: 'teste@create.barbershop',
        cpf: '01293212312',
        password: 'teste123',
        type: 'barbershop_owner',
        register_by: 'web',
      },
    },
  })
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
