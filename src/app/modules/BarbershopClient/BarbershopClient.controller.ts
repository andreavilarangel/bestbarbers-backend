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
  BarbershopClientCreateDTO,
  BarbershopClientUpdateDTO,
  BarbershopClientFindAllDTO,
} from 'src/app/dtos/BarbershopClient.dto';
import { BarbershopClientPresenter } from 'src/app/modules/BarbershopClient/BarbershopClient.presenter';
import { BarbershopClientHandle } from 'src/app/handles/BarbershopClient/BarbershopClient.handle';
import { FindAllPresent } from 'src/shared/FindAll.presenter';
import { BarbershopClientNotFoundException } from 'src/app/errors/BarbershopClient.error';

@Injectable()
@ApiTags('BarbershopClient')
@Controller('barbershopClient')
export class BarbershopClientController {
  constructor(
    private readonly barbershopClientHandle: BarbershopClientHandle,
  ) {}

  @Post()
  @ApiOperation({ summary: 'Cria um BarbershopClient' })
  @ApiResponse({ type: BarbershopClientPresenter })
  @ApiException(() => [])
  async createOneBarbershopClient(
    @Body() newBarbershopClient: BarbershopClientCreateDTO,
  ): Promise<BarbershopClientPresenter> {
    return this.barbershopClientHandle.createOneBarbershopClient(
      newBarbershopClient,
    );
  }

  @Put('/:barbershopClientId')
  @ApiOperation({ summary: 'Atualiza dados de um BarbershopClient' })
  @ApiResponse({ type: BarbershopClientPresenter })
  @ApiException(() => [BarbershopClientNotFoundException])
  async updateOneBarbershopClient(
    @Param('barbershopClientId') barbershopClientId: string,
    @Body() dataBarbershopClient: BarbershopClientUpdateDTO,
  ): Promise<BarbershopClientPresenter> {
    return this.barbershopClientHandle.updateOneBarbershopClient(
      barbershopClientId,
      dataBarbershopClient,
    );
  }

  @Get()
  @ApiOperation({ summary: 'Lista de todos os BarbershopClients' })
  @ApiResponse({ type: FindAllPresent.forEntity(BarbershopClientPresenter) })
  async getAllBarbershopClient(
    @Query() queries: BarbershopClientFindAllDTO,
  ): Promise<FindAllPresent<BarbershopClientPresenter>> {
    return this.barbershopClientHandle.findAllBarbershopClient(queries);
  }

  @Get('/:barbershopClientId')
  @ApiOperation({ summary: 'Obtém dados de um BarbershopClient' })
  @ApiResponse({ type: BarbershopClientPresenter })
  @ApiException(() => [BarbershopClientNotFoundException])
  async getOneBarbershopClientById(
    @Param('barbershopClientId') barbershopClientId: string,
  ): Promise<BarbershopClientPresenter> {
    return this.barbershopClientHandle.findOneBarbershopClientById(
      barbershopClientId,
    );
  }
}
