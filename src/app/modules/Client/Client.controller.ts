import { ApiException } from '@nanogiants/nestjs-swagger-api-exception-decorator';
import {
  Body,
  Controller,
  Get,
  Injectable,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import {
  ClientCreateDTO,
  ClientUpdateDTO,
  ClientFindAllDTO,
} from 'src/app/modules/Client/Client.dto';
import { ClientPresenter } from 'src/app/modules/Client/Client.presenter';
import { ClientHandle } from 'src/app/handles/Client/Client.handle';
import { FindAllPresent } from 'src/shared/FindAll.presenter';

import { ClientNotFoundException } from 'src/app/modules/Client/Client.error';
import { Public } from 'src/app/decorators/public';

@Injectable()
@ApiTags('Clientes (Client)')
@Controller('client')
@Public()
export class ClientController {
  constructor(private readonly clientHandle: ClientHandle) {}

  @Post()
  @ApiOperation({ summary: 'Cria um cliente' })
  @ApiResponse({ type: ClientPresenter })
  @ApiException(() => [])
  async createOneClient(
    @Body() newClient: ClientCreateDTO,
  ): Promise<ClientPresenter> {
    return this.clientHandle.createOneClient(newClient);
  }

  // @Put('/:clientId')
  // @ApiOperation({ summary: 'Atualiza dados de um Client' })
  // @ApiResponse({ type: ClientPresenter })
  // @ApiException(() => [ClientNotFoundException])
  // async updateOneClient(
  //   @Param('clientId') clientId: string,
  //   @Body() dataClient: ClientUpdateDTO,
  // ): Promise<ClientPresenter> {
  //   return this.clientHandle.updateOneClient(clientId, dataClient);
  // }

  // @Get()
  // @ApiOperation({ summary: 'Lista de todos os Clients' })
  // @ApiResponse({ type: FindAllPresent.forEntity(ClientPresenter) })
  // async getAllClient(
  //   @Query() queries: ClientFindAllDTO,
  // ): Promise<FindAllPresent<ClientPresenter>> {
  //   return this.clientHandle.findAllClient(queries);
  // }

  // @Get('/:clientId')
  // @ApiOperation({ summary: 'Obtém dados de um Client' })
  // @ApiResponse({ type: ClientPresenter })
  // @ApiException(() => [ClientNotFoundException])
  // async getOneClientById(
  //   @Param('clientId') clientId: string,
  // ): Promise<ClientPresenter> {
  //   return this.clientHandle.findOneClientById(clientId);
  // }
}
