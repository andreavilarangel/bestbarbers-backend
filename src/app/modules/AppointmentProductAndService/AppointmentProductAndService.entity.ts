import { AppointmentProductAndService } from '@prisma/client';
import { IsUUID, IsOptional, IsNumber } from 'class-validator';
import { ApiPropertyOptional, ApiProperty } from '@nestjs/swagger';

export class AppointmentProductAndServiceEntity
  implements AppointmentProductAndService
{
  @IsUUID()
  @IsOptional()
  @ApiPropertyOptional({ example: 'e7cc7b24-27a5-4f1e-bba3-d7531cf965a0' })
  id: string;

  @IsUUID()
  @ApiProperty({ example: 'e7cc7b24-27a5-4f1e-bba3-d7531cf965a0' })
  product_service_id: string;

  @IsUUID()
  @ApiProperty({ example: 'e7cc7b24-27a5-4f1e-bba3-d7531cf965a0' })
  barbershop_id: string;

  @IsOptional()
  @ApiProperty({ example: 'e7cc7b24-27a5-4f1e-bba3-d7531cf965a0' })
  employer_id: string;

  @IsOptional()
  @ApiProperty({ example: 'e7cc7b24-27a5-4f1e-bba3-d7531cf965a0' })
  appointment_id: string;

  @IsNumber()
  @ApiProperty({ example: 40 })
  employer_percentage: number;

  @IsNumber()
  @ApiProperty({ example: 100 })
  employer_value: number;

  @IsOptional()
  @ApiProperty({ example: '2023-03-16T21:21:51.875Z' })
  created_at: Date;

  @IsOptional()
  @ApiProperty({ example: '2023-03-16T21:21:51.875Z' })
  updated_at: Date;
}
