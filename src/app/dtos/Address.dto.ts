import { OmitType, PartialType } from '@nestjs/swagger';
import { PaginationDTO } from './Pagination.dto';
import { AddressEntity } from 'src/core/entities/Address.entity';

export class AddressCreateDTO extends OmitType(AddressEntity, [
  'id',
  'created_at',
  'updated_at',
]) {}

export class AddressUpdateDTO extends PartialType(AddressCreateDTO) {}

export class AddressFindAllDTO extends PaginationDTO {}
