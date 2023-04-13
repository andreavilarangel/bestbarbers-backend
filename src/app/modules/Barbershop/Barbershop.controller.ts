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
  BarbershopCreateDTO,
  BarbershopUpdateDTO,
  BarbershopFindAllDTO,
} from 'src/app/dtos/Barbershop.dto';
import { BarbershopPresenter } from 'src/app/presenter/Barbershop.presenter';
import { BarbershopHandle } from 'src/app/handles/Barbershop/Barbershop.handle';
import { FindAllPresent } from 'src/app/presenter/FindAll.presenter';
import { BarbershopControllerInterface } from './BarbershopController.interface';
import { BarbershopNotFoundException } from 'src/app/errors/Barbershop.error';

@Injectable()
@ApiTags('Barbershop')
@Controller('barbershop')
export class BarbershopController implements BarbershopControllerInterface {
  constructor(private readonly barbershopHandle: BarbershopHandle) {}

  @Post()
  @ApiOperation({ summary: 'Cria um Barbershop' })
  @ApiResponse({ type: BarbershopPresenter })
  @ApiException(() => [])
  async createOneBarbershop(
    @Body() newBarbershop: BarbershopCreateDTO,
  ): Promise<BarbershopPresenter> {
    return this.barbershopHandle.createOneBarbershop(newBarbershop);
  }

  @Put('/:barbershopId')
  @ApiOperation({ summary: 'Atualiza dados de um Barbershop' })
  @ApiResponse({ type: BarbershopPresenter })
  @ApiException(() => [BarbershopNotFoundException])
  async updateOneBarbershop(
    @Param('barbershopId') barbershopId: string,
    @Body() dataBarbershop: BarbershopUpdateDTO,
  ): Promise<BarbershopPresenter> {
    return this.barbershopHandle.updateOneBarbershop(
      barbershopId,
      dataBarbershop,
    );
  }

  @Get()
  @ApiOperation({ summary: 'Lista de todos os Barbershops' })
  @ApiResponse({ type: FindAllPresent.forEntity(BarbershopPresenter) })
  async getAllBarbershop(
    @Query() queries: BarbershopFindAllDTO,
  ): Promise<FindAllPresent<BarbershopPresenter>> {
    return this.barbershopHandle.findAllBarbershop(queries);
  }

  @Get('/:barbershopId')
  @ApiOperation({ summary: 'Obtém dados de um Barbershop' })
  @ApiResponse({ type: BarbershopPresenter })
  @ApiException(() => [BarbershopNotFoundException])
  async getOneBarbershopById(
    @Param('barbershopId') barbershopId: string,
  ): Promise<BarbershopPresenter> {
    return this.barbershopHandle.findOneBarbershopById(barbershopId);
  }
}
