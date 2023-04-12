import { Body, Controller, Injectable, Post } from '@nestjs/common';
import {
  ApiForbiddenResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { Public } from 'src/app/decorators/public';
import { AuthSignInDTO } from 'src/app/dtos/Auth.dto';
import { AuthPasswordWrongException } from 'src/app/errors/Auth.error';
import { UsuarioNotFoundException } from 'src/app/errors/Usuario.error';
import { AuthHandle } from 'src/app/handles/Auth/Auth.handle';
import { AuthPresenter } from 'src/app/presenter/Auth.presenter';
import { AuthControllerInterface } from './AuthController.interface';
import { ApiException } from '@nanogiants/nestjs-swagger-api-exception-decorator';
import { UserNotFoundException } from 'src/app/errors/User.error';

@Injectable()
@Controller('auth')
@ApiTags('Autenticação')
@Public()
export class AuthController implements AuthControllerInterface {
  constructor(private readonly authHandle: AuthHandle) {}

  @Post()
  @ApiOperation({
    summary: 'Autenticação de um usuário',
    description: 'Username pode ser phone ou email',
  })
  @ApiOkResponse({ type: AuthPresenter })
  @ApiException(() => [UserNotFoundException, AuthPasswordWrongException])
  async signIn(@Body() body: AuthSignInDTO): Promise<AuthPresenter> {
    return this.authHandle.signIn(body.username, body.password);
  }

  async resetPassword(body: {
    username: string;
    newPassword: string;
    code: string;
  }): Promise<void> {
    throw new Error('Method not implemented.');
  }
}