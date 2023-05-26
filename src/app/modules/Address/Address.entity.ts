import { Address } from '@prisma/client';
import { IsUUID, IsOptional } from 'class-validator';
import { ApiPropertyOptional, ApiProperty } from '@nestjs/swagger';

export class AddressEntity implements Address {
  @IsUUID()
  @IsOptional()
  @ApiPropertyOptional({ example: 'e7cc7b24-27a5-4f1e-bba3-d7531cf965a0' })
  id: string;

  @IsUUID()
  @IsOptional()
  @ApiPropertyOptional({ example: 'e7cc7b24-27a5-4f1e-bba3-d7531cf965a0' })
  barbershop_id: string;

  @IsUUID()
  @IsOptional()
  @ApiPropertyOptional({ example: 'e7cc7b24-27a5-4f1e-bba3-d7531cf965a0' })
  client_id: string;

  @ApiPropertyOptional({ example: '30112-020' })
  zip_code: string;

  @IsOptional()
  @ApiPropertyOptional({ example: 'Casa' })
  title: string;

  @ApiPropertyOptional({ example: 'Rua' })
  street: string;

  @ApiPropertyOptional({ example: 'Número' })
  street_number: string;

  @IsOptional()
  @ApiPropertyOptional({ example: 'Complemento' })
  complement: string;

  @ApiPropertyOptional({ example: 'Bairro' })
  neighborhood: string;

  @ApiPropertyOptional({ example: 'Cidade' })
  city: string;

  @ApiPropertyOptional({ example: 'Estado' })
  state: string;

  @ApiPropertyOptional({ example: 'Country' })
  country: string;

  @ApiPropertyOptional({ example: 'Latitude' })
  latitude: number;

  @ApiPropertyOptional({ example: 'longitude' })
  longitude: number;

  @ApiPropertyOptional({ example: 'Ponto geográfico' })
  geo_point: string;

  @IsOptional()
  @ApiProperty({ example: '2023-03-16T21:21:51.875Z' })
  created_at: Date;

  @IsOptional()
  @ApiProperty({ example: '2023-03-16T21:21:51.875Z' })
  updated_at: Date;
}
