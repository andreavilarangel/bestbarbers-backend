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
  AppointmentCreateDTO,
  AppointmentUpdateDTO,
  AppointmentFindAllDTO,
} from 'src/app/modules/Appointment/Appointment.dto';
import { AppointmentPresenter } from 'src/app/modules/Appointment/Appointment.presenter';
import { AppointmentHandle } from 'src/app/handles/Appointment/Appointment.handle';
import { FindAllPresent } from 'src/shared/FindAll.presenter';
import { AppointmentNotFoundException } from 'src/app/handles/Appointment/Appointment.error';
import { Public } from 'src/app/decorators/public';

@Injectable()
@ApiTags('Agendamentos (Appointment)')
@Controller('appointment')
@Public()
export class AppointmentController {
  constructor(private readonly appointmentHandle: AppointmentHandle) {}

  @Post()
  @ApiOperation({ summary: 'Cria um agendamento' })
  @ApiResponse({ type: AppointmentPresenter })
  @ApiException(() => [])
  async createOneAppointment(
    @Body() newAppointment: AppointmentCreateDTO,
  ): Promise<AppointmentPresenter> {
    return this.appointmentHandle.createOneAppointment(newAppointment);
  }

  @Put('/:appointment_id')
  @ApiOperation({ summary: 'Atualiza dados de um agendamento' })
  @ApiResponse({ type: AppointmentPresenter })
  @ApiException(() => [AppointmentNotFoundException])
  async updateOneAppointment(
    @Param('appointment_id') appointment_id: string,
    @Body() dataAppointment: AppointmentUpdateDTO,
  ): Promise<AppointmentPresenter> {
    return this.appointmentHandle.updateOneAppointment(
      appointment_id,
      dataAppointment,
    );
  }

  // @Get()
  // @ApiOperation({ summary: 'Lista de todos os Appointments' })
  // @ApiResponse({ type: FindAllPresent.forEntity(AppointmentPresenter) })
  // async getAllAppointment(
  //   @Query() queries: AppointmentFindAllDTO,
  // ): Promise<FindAllPresent<AppointmentPresenter>> {
  //   return this.appointmentHandle.findAllAppointment(queries);
  // }

  // @Get('/:appointmentId')
  // @ApiOperation({ summary: 'Obtém dados de um Appointment' })
  // @ApiResponse({ type: AppointmentPresenter })
  // @ApiException(() => [AppointmentNotFoundException])
  // async getOneAppointmentById(
  //   @Param('appointmentId') appointmentId: string,
  // ): Promise<AppointmentPresenter> {
  //   return this.appointmentHandle.findOneAppointmentById(appointmentId);
  // }
}
