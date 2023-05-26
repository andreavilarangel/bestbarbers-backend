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
import { BarbershopOpeningHourPresenter } from 'src/app/modules/BarbershopOpeningHour/BarbershopOpeningHour.presenter';
import { BarbershopOpeningHourHandle } from 'src/app/handles/BarbershopOpeningHour/BarbershopOpeningHour.handle';
import { FindAllPresent } from 'src/shared/FindAll.presenter';
import { BarbershopOpeningHourNotFoundException } from 'src/app/errors/BarbershopOpeningHour.error';
import { Public } from 'src/app/decorators/public';

@Injectable()
@ApiTags('BarbershopOpeningHour')
@Controller('barbershopOpeningHour')
@Public()
export class BarbershopOpeningHourController {
  constructor(
    private readonly barbershopOpeningHourHandle: BarbershopOpeningHourHandle,
  ) {}

  @Put()
  @ApiOperation({
    summary: 'Atualiza todos os horarios de funcionamento da barbearia',
  })
  @ApiResponse({ type: BarbershopOpeningHourPresenter })
  @ApiException(() => [BarbershopOpeningHourNotFoundException])
  async updateAllBarbershopOpeningHour(@Body() data: any): Promise<any> {
    return this.barbershopOpeningHourHandle.updateAllBarbershopOpeningHour(
      data,
    );
  }

  @Get()
  @ApiOperation({
    summary: 'Lista todos os horarios de funcionamento da barbearia',
  })
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
}
