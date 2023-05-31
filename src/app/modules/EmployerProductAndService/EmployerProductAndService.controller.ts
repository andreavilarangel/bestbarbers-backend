import { ApiException } from '@nanogiants/nestjs-swagger-api-exception-decorator';
import { Body, Controller, Injectable, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { EmployerProductAndServiceCreateDTO } from './EmployerProductAndService.dto';
import { EmployerProductAndServicePresenter } from 'src/app/modules/EmployerProductAndService/EmployerProductAndService.presenter';
import { EmployerProductAndServiceHandle } from 'src/app/handles/EmployerProductAndService/EmployerProductAndService.handle';
import { Public } from 'src/app/decorators/public';

@Injectable()
@ApiTags(
  'Relacionamento Colaborador x Produtos e Serviços (EmployerProductAndService)',
)
@Controller('employer-product-and-service')
@Public()
export class EmployerProductAndServiceController {
  constructor(
    private readonly employerProductAndServiceHandle: EmployerProductAndServiceHandle,
  ) {}

  @Post()
  @ApiOperation({
    summary:
      'Associa um colaborador a um produto ou serviço, com suas comissões, valor e tempo de execução',
  })
  @ApiResponse({ type: EmployerProductAndServicePresenter })
  @ApiException(() => [])
  async createOrUpdateEmployerProductAndService(
    @Body() newEmployerProductAndService: EmployerProductAndServiceCreateDTO,
  ): Promise<EmployerProductAndServicePresenter> {
    return this.employerProductAndServiceHandle.createOrUpdateEmployerProductAndService(
      newEmployerProductAndService,
    );
  }

  // @Get()
  // @ApiOperation({ summary: 'Lista de todos os EmployerProductAndServices' })
  // @ApiResponse({
  //   type: FindAllPresent.forEntity(EmployerProductAndServicePresenter),
  // })
  // async getAllEmployerProductAndService(
  //   @Query() queries: EmployerProductAndServiceFindAllDTO,
  // ): Promise<FindAllPresent<EmployerProductAndServicePresenter>> {
  //   return this.employerProductAndServiceHandle.findAllEmployerProductAndService(
  //     queries,
  //   );
  // }

  // @Get('/:employerProductAndServiceId')
  // @ApiOperation({ summary: 'Obtém dados de um EmployerProductAndService' })
  // @ApiResponse({ type: EmployerProductAndServicePresenter })
  // @ApiException(() => [EmployerProductAndServiceNotFoundException])
  // async getOneEmployerProductAndServiceById(
  //   @Param('employerProductAndServiceId') employerProductAndServiceId: string,
  // ): Promise<EmployerProductAndServicePresenter> {
  //   return this.employerProductAndServiceHandle.findOneEmployerProductAndServiceById(
  //     employerProductAndServiceId,
  //   );
  // }
}
