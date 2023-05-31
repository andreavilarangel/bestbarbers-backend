import { EmployerProductAndService } from '@prisma/client';
import { IsUUID, IsOptional } from 'class-validator';
import { ApiPropertyOptional, ApiProperty } from '@nestjs/swagger';

export class EmployerProductAndServiceEntity
  implements EmployerProductAndService
{
  @IsUUID()
  @IsOptional()
  @ApiPropertyOptional({ example: 'e7cc7b24-27a5-4f1e-bba3-d7531cf965a0' })
  id: string;

  @IsUUID()
  @ApiProperty({ example: '1bade777-cb90-4c37-970a-2623875d871c' })
  barbershop_id: string;

  @IsUUID()
  @ApiProperty({ example: '8a1e93cb-db12-424c-926c-49afb46deda8' })
  employer_id: string;

  @IsUUID()
  @ApiPropertyOptional({ example: '1a8aa6c8-a8fd-40a9-b09c-860ab27632ca' })
  product_and_service_id: string;

  @ApiPropertyOptional({ example: 30 })
  comission_percentage: number;

  @ApiPropertyOptional({ example: 100 })
  value: number;

  @ApiPropertyOptional({ example: '00:30:00' })
  time_required: string;

  @IsOptional()
  @ApiProperty({ example: '2023-03-16T21:21:51.875Z' })
  created_at: Date;

  @IsOptional()
  @ApiProperty({ example: '2023-03-16T21:21:51.875Z' })
  updated_at: Date;
}
