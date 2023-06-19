import { ApiException } from '@nanogiants/nestjs-swagger-api-exception-decorator';
import {
  Body,
  Controller,
  Get,
  Injectable,
  Param,
  Post,
  Put,
  Delete,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import {
  ServiceCreateDTO,
  ServiceUpdateDTO,
} from 'src/app/modules/Service/Service.dto';
import { ServicePresenter } from 'src/app/modules/Service/Service.presenter';
import { ServiceHandle } from 'src/app/handles/Service/Service.handle';
import { FindAllPresent } from 'src/shared/FindAll.presenter';
import { ServiceNotFoundException } from 'src/app/modules/Service/Service.error';

@Injectable()
@ApiTags('Service')
@Controller('service')
export class ServiceController {
  constructor(private readonly serviceHandle: ServiceHandle) {}

  @Post()
  @ApiOperation({ summary: 'Cria um Service' })
  @ApiResponse({ type: ServicePresenter })
  @ApiException(() => [])
  async createOneService(
    @Body() newService: ServiceCreateDTO,
  ): Promise<ServicePresenter> {
    return this.serviceHandle.createOneService(newService);
  }

  @Put('/:serviceId')
  @ApiOperation({ summary: 'Atualiza dados de um Service' })
  @ApiResponse({ type: ServicePresenter })
  @ApiException(() => [ServiceNotFoundException])
  async updateOneService(
    @Param('serviceId') serviceId: string,
    @Body() dataService: ServiceUpdateDTO,
  ): Promise<ServicePresenter> {
    return this.serviceHandle.updateOneService(serviceId, dataService);
  }

  @Get('/:barbershop_id')
  @ApiOperation({ summary: 'Lista de todos os serviços de uma barbearia' })
  @ApiResponse({ type: FindAllPresent.forEntity(ServicePresenter) })
  async getBarbershopProducts(
    @Param('barbershop_id') barbershop_id: string,
  ): Promise<FindAllPresent<ServicePresenter>> {
    return this.serviceHandle.findBarbershopServices(barbershop_id);
  }

  @Delete('/delete/:service_id')
  @ApiOperation({ summary: 'Exclui um produto' })
  @ApiResponse({ type: ServicePresenter })
  @ApiException(() => [ServiceNotFoundException])
  async deleteOneProductAndService(
    @Param('service_id') service_id: string,
  ): Promise<ServicePresenter> {
    return this.serviceHandle.deleteOneService(service_id);
  }
}
