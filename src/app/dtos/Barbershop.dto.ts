import { OmitType, PartialType } from '@nestjs/swagger';
import { PaginationDTO } from './Pagination.dto';
import { BarbershopEntity } from 'src/core/entities/Barbershop.entity';

export class BarbershopCreateDTO extends OmitType(BarbershopEntity, [
  'id',
  'created_at',
  'updated_at',
  'inactive',
]) {}

export class BarbershopUpdateDTO extends PartialType(BarbershopCreateDTO) {}

export class BarbershopFindAllDTO extends PaginationDTO {}
