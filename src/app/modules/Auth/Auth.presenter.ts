import { ApiProperty } from '@nestjs/swagger';
import { UserEntity } from 'src/app/modules/User/User.entity';
import { BarbershopEntity } from 'src/app/modules/Barbershop/Barbershop.entity';

export class AuthPresenter {
  @ApiProperty({
    example: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c`,
  })
  token: string;

  @ApiProperty({ type: UserEntity })
  user: UserEntity;

  @ApiProperty({ type: BarbershopEntity, required: false })
  barbershop: BarbershopEntity;
}
