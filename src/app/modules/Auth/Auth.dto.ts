import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';
export class AuthSignInDTO {
  @ApiProperty({ example: 'email or phone' })
  @IsString()
  user: string;

  @ApiProperty({ example: 'password' })
  @IsString()
  password: string;
}
