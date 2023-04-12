import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';
export class AuthSignInDTO {
  @ApiProperty({ example: 'username' })
  @IsString()
  username: string;

  @ApiProperty({ example: 'password' })
  @IsString()
  password: string;
}
