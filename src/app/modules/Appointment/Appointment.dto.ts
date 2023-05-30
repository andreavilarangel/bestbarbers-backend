import { OmitType, PartialType } from '@nestjs/swagger';
import { PaginationDTO } from '../../../shared/Pagination.dto';
import { AppointmentEntity } from 'src/app/modules/Appointment/Appointment.entity';

export class AppointmentCreateDTO extends OmitType(AppointmentEntity, [
  'id',
  'created_at',
  'updated_at',
]) {
  products_and_services: any;
}
export class AppointmentUpdateDTO extends PartialType(AppointmentCreateDTO) {}
export class AppointmentFindAllDTO extends PaginationDTO {}
