import { Service } from '@prisma/client';
import { IsUUID, IsOptional, IsString, IsNumber } from 'class-validator';
import { ApiPropertyOptional, ApiProperty } from '@nestjs/swagger';
import { ProductAndServiceType } from '@prisma/client';

export class ServiceEntity implements Service {
  @IsUUID()
  @IsOptional()
  @ApiPropertyOptional({ example: 'e7cc7b24-27a5-4f1e-bba3-d7531cf965a0' })
  id: string;

  @IsUUID()
  @ApiPropertyOptional({ example: 'e7cc7b24-27a5-4f1e-bba3-d7531cf965a0' })
  barbershop_id: string;

  @IsString()
  @ApiProperty({ example: '2023-03-16T21:21:51.875Z' })
  name: string;

  @IsNumber()
  @ApiProperty({ example: 34.9 })
  value: number;

  @IsString()
  @ApiProperty({ example: '00:20:00' })
  time_required: string;

  @IsString()
  @ApiProperty({ example: 'service' })
  type: ProductAndServiceType;

  @IsNumber()
  @ApiProperty({ example: 39.9 })
  default_comission: number;

  @IsOptional()
  service_category_id: string;

  @IsOptional()
  image_url: string;

  @IsOptional()
  inactive: boolean;

  @IsOptional()
  @ApiProperty({ example: '2023-03-16T21:21:51.875Z' })
  created_at: Date;

  @IsOptional()
  @ApiProperty({ example: '2023-03-16T21:21:51.875Z' })
  updated_at: Date;
}
