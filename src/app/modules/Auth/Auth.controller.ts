import { Body, Controller, Injectable, Post } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Public } from 'src/app/decorators/public';
import { AuthSignInDTO } from 'src/app/dtos/Auth.dto';
import { AuthPasswordWrongException } from 'src/app/errors/Auth.error';
import { AuthHandle } from 'src/app/handles/Auth/Auth.handle';
import { AuthPresenter } from 'src/app/modules/Auth/Auth.presenter';
import { ApiException } from '@nanogiants/nestjs-swagger-api-exception-decorator';
import { UserNotFoundException } from 'src/app/errors/User.error';

@Injectable()
@Controller('login')
@ApiTags('Autenticação')
@Public()
export class AuthController {
  constructor(private readonly authHandle: AuthHandle) {}

  @Post()
  @ApiOperation({
    summary: 'Autenticação de um usuário',
    description: 'Username pode ser phone ou email',
  })
  @ApiOkResponse({ type: AuthPresenter })
  @ApiException(() => [UserNotFoundException, AuthPasswordWrongException])
  async signIn(@Body() body: AuthSignInDTO): Promise<AuthPresenter> {
    return this.authHandle.signIn(body.user, body.password);
  }
}
