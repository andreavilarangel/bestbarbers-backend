import { Product } from '@prisma/client';
import { IsUUID, IsOptional, IsString, IsNumber } from 'class-validator';
import { ApiPropertyOptional, ApiProperty } from '@nestjs/swagger';

export class ProductEntity implements Product {
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

  @IsNumber()
  @ApiProperty({ example: 39.9 })
  default_comission: number;

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
