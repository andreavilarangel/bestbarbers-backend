import { Barbershop } from '@prisma/client';
import { IsUUID, IsOptional, IsString } from 'class-validator';
import { ApiPropertyOptional, ApiProperty } from '@nestjs/swagger';

export class BarbershopEntity implements Barbershop {
  @IsUUID()
  @IsOptional()
  @ApiPropertyOptional({ example: 'e7cc7b24-27a5-4f1e-bba3-d7531cf965a0' })
  id: string;

  @IsUUID()
  @IsOptional()
  @ApiPropertyOptional({ example: 'e7cc7b24-27a5-4f1e-bba3-d7531cf965a0' })
  user_id: string;

  @IsString()
  @IsOptional()
  @ApiPropertyOptional()
  name: string;

  @IsString()
  @IsOptional()
  @ApiPropertyOptional()
  description: string;

  @IsOptional()
  @ApiPropertyOptional()
  cnpj: string;

  @IsOptional()
  @ApiPropertyOptional()
  rating: number;

  @IsOptional()
  @ApiPropertyOptional()
  agenda_interval: number;

  @IsOptional()
  @ApiPropertyOptional()
  status: string;

  @IsOptional()
  @ApiPropertyOptional()
  slug: string;

  @IsOptional()
  @ApiPropertyOptional({ example: 'hhtp://suaimagem.com' })
  profile_image_url: string;

  @IsOptional()
  @ApiProperty({ example: '2023-03-16' })
  trial_start_date: string;

  @IsOptional()
  @ApiProperty({ example: '2023-03-16' })
  trial_end_date: string;

  @IsOptional()
  @ApiProperty({ example: 'onboarding' })
  account_status: string;

  @IsOptional()
  @ApiProperty({ example: 'paid' })
  subscription_status: string;

  @IsOptional()
  @ApiProperty({ example: '2023-03-16' })
  payment_issue_date: string;

  @IsOptional()
  @ApiProperty({ example: '2023-03-16' })
  last_payment_date: string;

  @IsOptional()
  @ApiProperty({ example: 1 })
  payments_counter: number;

  @IsOptional()
  @ApiProperty({ example: '2023-03-16' })
  asaas_barbershop_id: string;

  @IsOptional()
  @ApiProperty({ example: '2023-03-16' })
  asaas_token_access: string;

  @IsOptional()
  @ApiProperty({ example: 'on_finish' })
  payment_on_app_enabled: string;

  @IsOptional()
  @ApiProperty({ default: false })
  signature_club_enabled: boolean;

  @ApiProperty({ default: false })
  inactive: boolean;

  @IsOptional()
  @ApiProperty({ example: '2023-03-16T21:21:51.875Z' })
  created_at: Date;

  @IsOptional()
  @ApiProperty({ example: '2023-03-16T21:21:51.875Z' })
  updated_at: Date;
}
