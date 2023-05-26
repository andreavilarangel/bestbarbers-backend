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
  AppointmentProductAndServiceCreateDTO,
  AppointmentProductAndServiceUpdateDTO,
  AppointmentProductAndServiceFindAllDTO,
} from 'src/app/dtos/AppointmentProductAndService.dto';
import { AppointmentProductAndServicePresenter } from 'src/app/modules/AppointmentProductAndService/AppointmentProductAndService.presenter';
import { AppointmentProductAndServiceHandle } from 'src/app/handles/AppointmentProductAndService/AppointmentProductAndService.handle';
import { FindAllPresent } from 'src/shared/FindAll.presenter';
import { AppointmentProductAndServiceNotFoundException } from 'src/app/errors/AppointmentProductAndService.error';

@Injectable()
@ApiTags('AppointmentProductAndService')
@Controller('appointmentProductAndService')
export class AppointmentProductAndServiceController {
  constructor(
    private readonly appointmentProductAndServiceHandle: AppointmentProductAndServiceHandle,
  ) {}

  // @Post()
  // @ApiOperation({ summary: 'Cria um AppointmentProductAndService' })
  // @ApiResponse({ type: AppointmentProductAndServicePresenter })
  // @ApiException(() => [])
  // async createOneAppointmentProductAndService(
  //   @Body()
  //   newAppointmentProductAndService: AppointmentProductAndServiceCreateDTO,
  // ): Promise<AppointmentProductAndServicePresenter> {
  //   return this.appointmentProductAndServiceHandle.createOneAppointmentProductAndService(
  //     newAppointmentProductAndService,
  //   );
  // }

  // @Put('/:appointmentProductAndServiceId')
  // @ApiOperation({
  //   summary: 'Atualiza dados de um AppointmentProductAndService',
  // })
  // @ApiResponse({ type: AppointmentProductAndServicePresenter })
  // @ApiException(() => [AppointmentProductAndServiceNotFoundException])
  // async updateOneAppointmentProductAndService(
  //   @Param('appointmentProductAndServiceId')
  //   appointmentProductAndServiceId: string,
  //   @Body()
  //   dataAppointmentProductAndService: AppointmentProductAndServiceUpdateDTO,
  // ): Promise<AppointmentProductAndServicePresenter> {
  //   return this.appointmentProductAndServiceHandle.updateOneAppointmentProductAndService(
  //     appointmentProductAndServiceId,
  //     dataAppointmentProductAndService,
  //   );
  // }

  // @Get()
  // @ApiOperation({ summary: 'Lista de todos os AppointmentProductAndServices' })
  // @ApiResponse({
  //   type: FindAllPresent.forEntity(AppointmentProductAndServicePresenter),
  // })
  // async getAllAppointmentProductAndService(
  //   @Query() queries: AppointmentProductAndServiceFindAllDTO,
  // ): Promise<FindAllPresent<AppointmentProductAndServicePresenter>> {
  //   return this.appointmentProductAndServiceHandle.findAllAppointmentProductAndService(
  //     queries,
  //   );
  // }

  // @Get('/:appointmentProductAndServiceId')
  // @ApiOperation({ summary: 'Obtém dados de um AppointmentProductAndService' })
  // @ApiResponse({ type: AppointmentProductAndServicePresenter })
  // @ApiException(() => [AppointmentProductAndServiceNotFoundException])
  // async getOneAppointmentProductAndServiceById(
  //   @Param('appointmentProductAndServiceId')
  //   appointmentProductAndServiceId: string,
  // ): Promise<AppointmentProductAndServicePresenter> {
  //   return this.appointmentProductAndServiceHandle.findOneAppointmentProductAndServiceById(
  //     appointmentProductAndServiceId,
  //   );
  // }
}
