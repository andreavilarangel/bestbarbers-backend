import { BlockedTime } from '@prisma/client';
import { IsUUID, IsOptional, IsString, IsBoolean } from 'class-validator';
import { ApiPropertyOptional, ApiProperty } from '@nestjs/swagger';

export class BlockedTimeEntity implements BlockedTime {
  @IsUUID()
  @IsOptional()
  @ApiPropertyOptional({ example: 'e7cc7b24-27a5-4f1e-bba3-d7531cf965a0' })
  id: string;

  @IsUUID()
  @ApiPropertyOptional({ example: 'e7cc7b24-27a5-4f1e-bba3-d7531cf965a0' })
  barbershop_id: string;

  @IsUUID()
  @IsOptional()
  @ApiPropertyOptional({ example: 'e7cc7b24-27a5-4f1e-bba3-d7531cf965a0' })
  employer_id: string;

  @IsBoolean()
  @IsOptional()
  @ApiPropertyOptional({ example: false, default: false })
  all_employees: boolean;

  @IsString()
  @IsOptional()
  @ApiPropertyOptional({ example: '2023-10-10' })
  date: string;

  @IsString()
  @IsOptional()
  @ApiPropertyOptional({ example: '08:00:00' })
  start_hour: string;

  @IsString()
  @IsOptional()
  @ApiPropertyOptional({ example: '20:00:00' })
  finish_hour: string;

  @IsBoolean()
  @IsOptional()
  @ApiPropertyOptional({ example: false, default: false })
  repeat_every_day: boolean;

  @IsString()
  @IsOptional()
  @ApiPropertyOptional({ example: '6' })
  repeat_every_week_day: string;

  @IsOptional()
  @ApiProperty({ example: '2023-03-16T21:21:51.875Z' })
  created_at: Date;

  @IsOptional()
  @ApiProperty({ example: '2023-03-16T21:21:51.875Z' })
  updated_at: Date;
}
