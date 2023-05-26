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
import { BarbershopPresenter } from 'src/app/modules/Barbershop/Barbershop.presenter';
import { BarbershopHandle } from 'src/app/handles/Barbershop/Barbershop.handle';
import { FindAllPresent } from 'src/shared/FindAll.presenter';
import { BarbershopNotFoundException } from 'src/app/errors/Barbershop.error';
import { Public } from 'src/app/decorators/public';

@Injectable()
@ApiTags('Barbershop')
@Controller('barbershop')
@Public()
export class BarbershopController {
  constructor(private readonly barbershopHandle: BarbershopHandle) {}

  @Post('create-account')
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
