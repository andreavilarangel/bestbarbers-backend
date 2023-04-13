import { OmitType, PartialType } from '@nestjs/swagger';
import { PaginationDTO } from './Pagination.dto';
import { BlockedTimeEntity } from 'src/core/entities/BlockedTime.entity';

export class BlockedTimeCreateDTO extends OmitType(BlockedTimeEntity, [
  'id',
  'created_at',
  'updated_at',
]) {}

export class BlockedTimeUpdateDTO extends PartialType(BlockedTimeCreateDTO) {}

export class BlockedTimeFindAllDTO extends PaginationDTO {}
