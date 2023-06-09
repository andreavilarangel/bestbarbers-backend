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
export class AvailableTimesDTO {
  date: string;
  barber_id: string;
  barbershop_id: string;
  time_required: string;
  current_date: string;
  current_hour: string;
}
export class AppointmentUpdateDTO extends PartialType(AppointmentCreateDTO) {}
export class AppointmentFindAllDTO extends PaginationDTO {}
