import { OmitType, PartialType } from '@nestjs/swagger';
import { PaginationDTO } from './Pagination.dto';
import { ClientEntity } from 'src/core/entities/Client.entity';

export class ClientCreateDTO extends OmitType(ClientEntity, [
  'id',
  'created_at',
  'updated_at',
  'inactive',
]) {}

export class ClientUpdateDTO extends PartialType(ClientCreateDTO) {}

export class ClientFindAllDTO extends PaginationDTO {}
