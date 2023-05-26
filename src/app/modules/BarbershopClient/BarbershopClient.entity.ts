import { BarbershopClient } from '@prisma/client';
import { IsUUID, IsOptional } from 'class-validator';
import { ApiPropertyOptional, ApiProperty } from '@nestjs/swagger';

export class BarbershopClientEntity implements BarbershopClient {
  @IsUUID()
  @IsOptional()
  @ApiPropertyOptional({ example: 'e7cc7b24-27a5-4f1e-bba3-d7531cf965a0' })
  id: string;

  @ApiProperty({ example: 'e7cc7b24-27a5-4f1e-bba3-d7531cf965a0' })
  barbershop_id: string;

  @ApiProperty({ example: 'e7cc7b24-27a5-4f1e-bba3-d7531cf965a0' })
  client_id: string;

  @ApiProperty({ example: false })
  isFavorite: boolean;

  @IsOptional()
  @ApiProperty({ example: '2023-03-16T21:21:51.875Z' })
  created_at: Date;

  @IsOptional()
  @ApiProperty({ example: '2023-03-16T21:21:51.875Z' })
  updated_at: Date;
}
