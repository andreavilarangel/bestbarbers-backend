import { OmitType, PartialType } from '@nestjs/swagger';
import { PaginationDTO } from 'src/shared/Pagination.dto';
import { ProductEntity } from 'src/app/modules/Product/Product.entity';

export class ProductCreateDTO extends OmitType(ProductEntity, [
  'id',
  'created_at',
  'updated_at',
  'inactive',
]) {}
export class ProductUpdateDTO extends PartialType(ProductCreateDTO) {}
export class ProductFindAllDTO extends PaginationDTO {}
