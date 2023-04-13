import { OmitType, PartialType } from '@nestjs/swagger';
import { PaginationDTO } from './Pagination.dto';
import { ProductAndServiceEntity } from 'src/core/entities/ProductAndService.entity';

export class ProductAndServiceCreateDTO extends OmitType(
  ProductAndServiceEntity,
  ['id', 'created_at', 'updated_at', 'inactive'],
) {}

export class ProductAndServiceUpdateDTO extends PartialType(
  ProductAndServiceCreateDTO,
) {}

export class ProductAndServiceFindAllDTO extends PaginationDTO {}