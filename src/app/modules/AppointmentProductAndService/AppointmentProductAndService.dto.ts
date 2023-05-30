import { OmitType, PartialType } from '@nestjs/swagger';
import { PaginationDTO } from '../../../shared/Pagination.dto';
import { AppointmentProductAndServiceEntity } from 'src/app/modules/AppointmentProductAndService/AppointmentProductAndService.entity';

export class AppointmentProductAndServiceCreateDTO extends OmitType(
  AppointmentProductAndServiceEntity,
  ['id', 'created_at', 'updated_at'],
) {}
export class AppointmentProductAndServiceUpdateDTO extends PartialType(
  AppointmentProductAndServiceCreateDTO,
) {}
export class AppointmentProductAndServiceFindAllDTO extends PaginationDTO {}
