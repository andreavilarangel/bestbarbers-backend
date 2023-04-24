import { OmitType, PartialType } from '@nestjs/swagger';
import { PaginationDTO } from './Pagination.dto';
import { BlockedTimeEntity } from 'src/core/entities/BlockedTime.entity';
import { IsString } from 'class-validator';

export class BlockedTimeCreateDTO extends OmitType(BlockedTimeEntity, [
  'id',
  'created_at',
  'updated_at',
]) {}

export class BlockedTimeUpdateDTO extends PartialType(BlockedTimeCreateDTO) {}

export class BlockedTimeFindAllDTO extends PaginationDTO {
  @IsString()
  barbershop_id: string;
}
