import { OmitType, PartialType } from '@nestjs/swagger';
import { PaginationDTO } from '../../../shared/Pagination.dto';
import { BarbershopOpeningHourEntity } from 'src/app/modules/BarbershopOpeningHour/BarbershopOpeningHour.entity';
import { IsString } from 'class-validator';

export class BarbershopOpeningHourCreateDTO extends OmitType(
  BarbershopOpeningHourEntity,
  ['id', 'created_at', 'updated_at'],
) {}

export class BarbershopOpeningHourUpdateDTO extends PartialType(
  BarbershopOpeningHourCreateDTO,
) {}

export class BarbershopOpeningHourFindAllDTO extends PaginationDTO {
  @IsString()
  barbershop_id: string;
}
