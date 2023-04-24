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
  BarbershopOpeningHourCreateDTO,
  BarbershopOpeningHourUpdateDTO,
  BarbershopOpeningHourFindAllDTO,
} from 'src/app/dtos/BarbershopOpeningHour.dto';
import { BarbershopOpeningHourPresenter } from 'src/app/presenter/BarbershopOpeningHour.presenter';
import { BarbershopOpeningHourHandle } from 'src/app/handles/BarbershopOpeningHour/BarbershopOpeningHour.handle';
import { FindAllPresent } from 'src/app/presenter/FindAll.presenter';
import { BarbershopOpeningHourControllerInterface } from './BarbershopOpeningHourController.interface';
import { BarbershopOpeningHourNotFoundException } from 'src/app/errors/BarbershopOpeningHour.error';
import { Public } from 'src/app/decorators/public';

@Injectable()
@ApiTags('BarbershopOpeningHour')
@Controller('barbershopOpeningHour')
@Public()
export class BarbershopOpeningHourController
  implements BarbershopOpeningHourControllerInterface
{
  constructor(
    private readonly barbershopOpeningHourHandle: BarbershopOpeningHourHandle,
  ) {}

  @Post()
  @ApiOperation({ summary: 'Cria um BarbershopOpeningHour' })
  @ApiResponse({ type: BarbershopOpeningHourPresenter })
  @ApiException(() => [])
  async createOneBarbershopOpeningHour(
    @Body() newBarbershopOpeningHour: BarbershopOpeningHourCreateDTO,
  ): Promise<BarbershopOpeningHourPresenter> {
    return this.barbershopOpeningHourHandle.createOneBarbershopOpeningHour(
      newBarbershopOpeningHour,
    );
  }

  @Put('/:barbershopOpeningHourId')
  @ApiOperation({ summary: 'Atualiza dados de um BarbershopOpeningHour' })
  @ApiResponse({ type: BarbershopOpeningHourPresenter })
  @ApiException(() => [BarbershopOpeningHourNotFoundException])
  async updateOneBarbershopOpeningHour(
    @Param('barbershopOpeningHourId') barbershopOpeningHourId: string,
    @Body() dataBarbershopOpeningHour: BarbershopOpeningHourUpdateDTO,
  ): Promise<BarbershopOpeningHourPresenter> {
    return this.barbershopOpeningHourHandle.updateOneBarbershopOpeningHour(
      barbershopOpeningHourId,
      dataBarbershopOpeningHour,
    );
  }

  @Put()
  @ApiOperation({ summary: 'Atualiza todos os horarios de uma barbearia' })
  @ApiResponse({ type: BarbershopOpeningHourPresenter })
  @ApiException(() => [BarbershopOpeningHourNotFoundException])
  async updateAllBarbershopOpeningHour(@Body() data: any): Promise<any> {
    console.log(data);
    return this.barbershopOpeningHourHandle.updateAllBarbershopOpeningHour(
      data,
    );
  }

  @Get()
  @ApiOperation({ summary: 'Lista de todos os BarbershopOpeningHours' })
  @ApiResponse({
    type: FindAllPresent.forEntity(BarbershopOpeningHourPresenter),
  })
  async getAllBarbershopOpeningHour(
    @Query() queries: BarbershopOpeningHourFindAllDTO,
  ): Promise<FindAllPresent<BarbershopOpeningHourPresenter>> {
    return this.barbershopOpeningHourHandle.findAllBarbershopOpeningHour(
      queries,
    );
  }

  @Get('/:barbershopOpeningHourId')
  @ApiOperation({ summary: 'Obtém dados de um BarbershopOpeningHour' })
  @ApiResponse({ type: BarbershopOpeningHourPresenter })
  @ApiException(() => [BarbershopOpeningHourNotFoundException])
  async getOneBarbershopOpeningHourById(
    @Param('barbershopOpeningHourId') barbershopOpeningHourId: string,
  ): Promise<BarbershopOpeningHourPresenter> {
    return this.barbershopOpeningHourHandle.findOneBarbershopOpeningHourById(
      barbershopOpeningHourId,
    );
  }
}
