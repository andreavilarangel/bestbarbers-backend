import { PaymentMethod } from '@prisma/client';
import { IsUUID, IsOptional, IsString } from 'class-validator';
import { ApiPropertyOptional, ApiProperty } from '@nestjs/swagger';

export class PaymentMethodEntity implements PaymentMethod {
  @IsUUID()
  @IsOptional()
  @ApiPropertyOptional({ example: 'e7cc7b24-27a5-4f1e-bba3-d7531cf965a0' })
  id: string;

  @IsUUID()
  @ApiPropertyOptional({ example: 'e7cc7b24-27a5-4f1e-bba3-d7531cf965a0' })
  barbershop_id: string;

  @IsString()
  name: string;

  @ApiPropertyOptional({ example: 5.0 })
  percentage: number;

  @ApiProperty({ default: true })
  discounted_from_barber: boolean;

  @ApiProperty({ example: 10 })
  due_in_days: number;

  @ApiProperty({ default: false })
  inactive: boolean;

  @IsOptional()
  @ApiProperty({ example: '2023-03-16T21:21:51.875Z' })
  created_at: Date;

  @IsOptional()
  @ApiProperty({ example: '2023-03-16T21:21:51.875Z' })
  updated_at: Date;
}
