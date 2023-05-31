import {
  Appointment,
  AppointmentTypes,
  AppointmentStatus,
} from '@prisma/client';
import { IsUUID, IsOptional, IsString } from 'class-validator';
import { ApiPropertyOptional, ApiProperty } from '@nestjs/swagger';

export class AppointmentEntity implements Appointment {
  @IsUUID()
  @IsOptional()
  @ApiPropertyOptional({ example: 'e7cc7b24-27a5-4f1e-bba3-d7531cf965a0' })
  id: string;

  @IsUUID()
  @ApiProperty({ example: '1bade777-cb90-4c37-970a-2623875d871c' })
  barbershop_id: string;

  @IsUUID()
  @ApiProperty({ example: '0eb7cf11-c65e-43b1-90c6-255968af3e54' })
  client_id: string;

  @IsUUID()
  @ApiProperty({ example: '8a1e93cb-db12-424c-926c-49afb46deda8' })
  employer_id: string;

  @IsString()
  @ApiProperty({ example: '2023-10-24' })
  date: string;

  @IsString()
  @ApiProperty({ example: '13:30:00' })
  start_hour: string;

  @IsString()
  @ApiProperty({ example: '14:30:00' })
  finish_hour: string;

  @IsString()
  @ApiProperty({ example: 'normal' })
  type: AppointmentTypes;

  @IsString()
  @ApiProperty({ example: 'pending' })
  status: AppointmentStatus;

  @ApiProperty({ default: false })
  inactive: boolean;

  @IsOptional()
  @ApiProperty({ example: '2023-03-16T21:21:51.875Z' })
  created_at: Date;

  @IsOptional()
  @ApiProperty({ example: '2023-03-16T21:21:51.875Z' })
  updated_at: Date;
}
