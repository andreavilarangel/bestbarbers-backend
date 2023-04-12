import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsNumber } from 'class-validator';
import { toNumber } from 'src/common/castHelper';

export class PaginationDTO {
  @IsNumber()
  @ApiProperty({ example: 20 })
  @Transform(({ value }) => toNumber(value, { default: 0, min: 0 }))
  skip: number;

  @IsNumber()
  @ApiProperty({ example: 10 })
  @Transform(({ value }) => toNumber(value, { default: 10, min: 1 }))
  take: number;
}
