import { Employer } from '@prisma/client';
import { IsUUID, IsOptional } from 'class-validator';
import { ApiPropertyOptional, ApiProperty } from '@nestjs/swagger';

export class EmployerEntity implements Employer {
  @IsUUID()
  @IsOptional()
  @ApiPropertyOptional({ example: 'e7cc7b24-27a5-4f1e-bba3-d7531cf965a0' })
  id: string;

  @ApiPropertyOptional({ example: 'e7cc7b24-27a5-4f1e-bba3-d7531cf965a0' })
  user_id: string;

  @ApiPropertyOptional({ example: 'e7cc7b24-27a5-4f1e-bba3-d7531cf965a0' })
  barbershop_id: string;

  @IsOptional()
  @ApiPropertyOptional({ example: 'e7cc7b24-27a5-4f1e-bba3-d7531cf965a0' })
  asaas_employer_id: string;

  @IsOptional()
  @ApiPropertyOptional({ example: 'e7cc7b24-27a5-4f1e-bba3-d7531cf965a0' })
  created_by_user_id: string;

  @IsOptional()
  @ApiProperty({ default: false })
  inactive: boolean;

  @IsOptional()
  @ApiProperty({ example: '2023-03-16T21:21:51.875Z' })
  created_at: Date;

  @IsOptional()
  @ApiProperty({ example: '2023-03-16T21:21:51.875Z' })
  updated_at: Date;
}
