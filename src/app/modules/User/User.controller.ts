import { ApiException } from '@nanogiants/nestjs-swagger-api-exception-decorator';
import {
  Body,
  Controller,
  Get,
  Injectable,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import {
  UserCreateDTO,
  UserUpdateDTO,
  // UserFindAllDTO,
} from 'src/app/dtos/User.dto';
import { UserPresenter } from 'src/app/modules/User/User.presenter';
import { UserHandle } from 'src/app/handles/User/User.handle';
import { UserPresenterResponse } from './UserController.interface';
import {
  UserAlreadyExistException,
  UserNotFoundException,
} from 'src/app/errors/User.error';
import { Public } from 'src/app/decorators/public';

@Injectable()
@ApiTags('Usuários (User)')
@Controller('user')
@Public()
export class UserController {
  constructor(private readonly userHandle: UserHandle) {}

  @Post()
  @ApiOperation({ summary: 'Criar um novo usuario' })
  @ApiResponse({ type: UserPresenter })
  @ApiException(() => [UserAlreadyExistException])
  async createOneUser(
    @Body() newUser: UserCreateDTO,
  ): Promise<Omit<UserPresenter, 'password'>> {
    return this.userHandle.createOneUser(newUser);
  }

  @Put('/:user_id')
  @ApiOperation({ summary: 'Atualizar dados de um usuario' })
  @ApiResponse({ type: UserPresenter })
  @ApiException(() => [UserNotFoundException])
  async updateOneUser(
    @Param('user_id') user_id: string,
    @Body() dataUser: UserUpdateDTO,
  ): Promise<UserPresenterResponse> {
    return this.userHandle.updateOneUser(user_id, dataUser);
  }

  // @Get()
  // @ApiOperation({ summary: 'Lista de usuario' })
  // @ApiResponse({
  //   type: FindAllPresent.forEntity(UserPresenter),
  // })
  // async getAllUser(
  //   @Query() queries: UserFindAllDTO,
  // ): Promise<FindAllPresent<UserPresenterResponse>> {
  //   return this.userHandle.findAllUser(queries);
  // }
  @Get('/:user_id')
  @ApiOperation({ summary: 'obter dados de um usuario' })
  @ApiResponse({ type: UserPresenter })
  @ApiException(() => [UserNotFoundException])
  async getOneUserById(
    @Param('user_id') user_id: string,
  ): Promise<UserPresenterResponse> {
    return this.userHandle.findOneUserById(user_id);
  }
}
