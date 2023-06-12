import { OmitType, PartialType, ApiProperty } from '@nestjs/swagger';
import { PaginationDTO } from '../../../shared/Pagination.dto';
import { AppointmentEntity } from 'src/app/modules/Appointment/Appointment.entity';

export class AppointmentCreateDTO extends OmitType(AppointmentEntity, [
  'id',
  'created_at',
  'updated_at',
  'canceled_at',
  'inactive',
  'status',
]) {
  @ApiProperty({ example: [{ id: '2d506048-e99c-4a40-a206-81ecc8acdbb9' }] })
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
