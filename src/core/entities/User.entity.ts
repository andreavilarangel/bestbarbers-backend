import { IsBoolean, IsOptional, IsString, IsUUID } from 'class-validator';
import { User } from '@prisma/client';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class UserEntity implements User {
  @IsUUID()
  @IsOptional()
  @ApiPropertyOptional({ example: 'e7cc7b24-27a5-4f1e-bba3-d7531cf965a0' })
  id: string;

  @IsString()
  @ApiProperty({ example: 'Joaquim José' })
  name: string;

  @IsString()
  @ApiProperty({ example: '5531995223788' })
  phone: string;

  @IsString()
  @ApiProperty({ example: 'username@test.com' })
  email: string;

  @IsString()
  @ApiProperty({ example: 'senha123456' })
  password: string;

  @IsOptional()
  @ApiPropertyOptional({ example: '10285769935' })
  cpf: string;

  @IsOptional()
  @ApiPropertyOptional({ example: '2023-10-10' })
  birth_date: string;

  @IsOptional()
  @ApiPropertyOptional({ example: 'hhtp://suaimagem.com' })
  profile_image_url: string;

  @IsString()
  @ApiProperty({ example: 'barbershop' })
  type: string;

  @IsOptional()
  @ApiPropertyOptional({ example: '[uid1, uid1]' })
  push_ids: string;

  @IsOptional()
  @ApiPropertyOptional({ example: 'android' })
  register_by: string;

  @IsOptional()
  @ApiPropertyOptional({ example: 'youtube' })
  met_through: string;

  @IsOptional()
  @ApiPropertyOptional({ example: '2023-12-12' })
  last_login: string;

  @IsOptional()
  @ApiPropertyOptional({ example: 'ELIAS10' })
  cupom: string;

  @IsBoolean()
  @ApiProperty({ default: false })
  inactive: boolean;

  @IsOptional()
  @ApiProperty({ example: '2023-03-16T21:21:51.875Z', default: new Date() })
  created_at: Date;

  @IsOptional()
  @ApiProperty({ example: '2023-03-16T21:21:51.875Z', default: new Date() })
  updated_at: Date;
}
