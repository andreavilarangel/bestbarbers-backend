import { ApiProperty } from '@nestjs/swagger';
import { UserEntity } from 'src/core/entities/User.entity';

export class AuthPresenter {
  @ApiProperty({})
  username: string;

  @ApiProperty({
    example: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c`,
  })
  access_token: string;

  @ApiProperty({ type: UserEntity })
  user: UserEntity;
}
