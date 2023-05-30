import { OmitType, PartialType } from '@nestjs/swagger';
import { PaginationDTO } from '../../../shared/Pagination.dto';
import { ProductAndServiceEntity } from 'src/app/modules/ProductAndService/ProductAndService.entity';

export class ProductAndServiceCreateDTO extends OmitType(
  ProductAndServiceEntity,
  ['id', 'created_at', 'updated_at', 'inactive'],
) {}

export class ProductAndServiceUpdateDTO extends PartialType(
  ProductAndServiceCreateDTO,
) {}

export class ProductAndServiceFindAllDTO extends PaginationDTO {}
