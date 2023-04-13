import { BarbershopOpeningHour } from '@prisma/client';
import { IsUUID, IsOptional, IsString } from 'class-validator';
import { ApiPropertyOptional, ApiProperty } from '@nestjs/swagger';

export class BarbershopOpeningHourEntity implements BarbershopOpeningHour {
  @IsUUID()
  @IsOptional()
  @ApiPropertyOptional({ example: 'e7cc7b24-27a5-4f1e-bba3-d7531cf965a0' })
  id: string;

  @IsString()
  @ApiPropertyOptional({ example: 'e7cc7b24-27a5-4f1e-bba3-d7531cf965a0' })
  barbershop_id: string;

  @IsString()
  @ApiPropertyOptional({ example: 1 })
  day: number;

  @IsOptional()
  @ApiPropertyOptional({ example: 'monday' })
  day_reference: string;

  @IsString()
  @ApiPropertyOptional({ example: '08:00:00', default: '08:00:00' })
  start_hour: string;

  @IsString()
  @ApiPropertyOptional({ example: '20:00:00', default: '20:00:00' })
  finish_hour: string;

  @IsOptional()
  @ApiPropertyOptional({ example: true, default: true })
  is_closed: boolean;

  @IsOptional()
  @ApiProperty({ example: '2023-03-16T21:21:51.875Z' })
  created_at: Date;

  @IsOptional()
  @ApiProperty({ example: '2023-03-16T21:21:51.875Z' })
  updated_at: Date;
}
