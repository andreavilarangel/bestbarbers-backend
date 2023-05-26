import { OmitType, PartialType } from '@nestjs/swagger';
import { PaginationDTO } from './Pagination.dto';
import { BarbershopClientEntity } from 'src/app/modules/BarbershopClient/BarbershopClient.entity';

export class BarbershopClientCreateDTO extends OmitType(
  BarbershopClientEntity,
  ['id', 'created_at', 'updated_at'],
) {}

export class BarbershopClientUpdateDTO extends PartialType(
  BarbershopClientCreateDTO,
) {}

export class BarbershopClientFindAllDTO extends PaginationDTO {}
