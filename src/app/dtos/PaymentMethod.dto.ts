import { OmitType, PartialType } from '@nestjs/swagger';
import { PaginationDTO } from './Pagination.dto';
import { PaymentMethodEntity } from 'src/app/modules/PaymentMethod/PaymentMethod.entity';

export class PaymentMethodCreateDTO extends OmitType(PaymentMethodEntity, [
  'id',
  'created_at',
  'updated_at',
  'inactive',
]) {}

export class PaymentMethodUpdateDTO extends PartialType(
  PaymentMethodCreateDTO,
) {}

export class PaymentMethodFindAllDTO extends PaginationDTO {}
