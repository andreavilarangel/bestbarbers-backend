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
  EmployerCreateDTO,
  EmployerUpdateDTO,
} from 'src/app/modules/Employer/Employer.dto';
import { EmployerPresenter } from 'src/app/modules/Employer/Employer.presenter';
import { EmployerHandle } from 'src/app/handles/Employer/Employer.handle';
import { FindAllPresent } from 'src/shared/FindAll.presenter';
import { EmployerNotFoundException } from 'src/app/modules/Employer/Employer.error';
import { Public } from 'src/app/decorators/public';

@Injectable()
@ApiTags('Colaboradores da Barbearia (Employer)')
@Controller('employer')
@Public()
export class EmployerController {
  constructor(private readonly employerHandle: EmployerHandle) {}

  @Post()
  @ApiOperation({ summary: 'Cria um colaborador' })
  @ApiResponse({ type: EmployerPresenter })
  @ApiException(() => [])
  async createOneEmployer(
    @Body() newEmployer: EmployerCreateDTO,
  ): Promise<EmployerPresenter> {
    return this.employerHandle.createOneEmployer(newEmployer);
  }

  @Put('/:employer_id')
  @ApiOperation({ summary: 'Atualiza dados de um colaborador' })
  @ApiResponse({ type: EmployerPresenter })
  @ApiException(() => [EmployerNotFoundException])
  async updateOneEmployer(
    @Param('employer_id') employer_id: string,
    @Body() dataEmployer: EmployerUpdateDTO,
  ): Promise<EmployerPresenter> {
    return this.employerHandle.updateOneEmployer(employer_id, dataEmployer);
  }

  @Get('/:barbershop_id')
  @ApiOperation({ summary: 'Lista todos os colaboradores de uma barbearia' })
  @ApiResponse({ type: EmployerPresenter })
  @ApiException(() => [EmployerNotFoundException])
  async getOneEmployerById(
    @Param('barbershop_id') barbershop_id: string,
  ): Promise<FindAllPresent<EmployerPresenter>> {
    return this.employerHandle.findEmployersByBarbershopId(barbershop_id);
  }

  @Delete('/delete/:employer_id')
  @ApiOperation({ summary: 'Exclui um colaborador' })
  @ApiResponse({ type: EmployerPresenter })
  @ApiException(() => [EmployerNotFoundException])
  async deleteOneEmployer(
    @Param('employer_id') employer_id: string,
  ): Promise<EmployerPresenter> {
    return this.employerHandle.deleteOneEmployer(employer_id);
  }
}
