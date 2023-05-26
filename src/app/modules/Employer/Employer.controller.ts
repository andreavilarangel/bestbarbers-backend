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
  EmployerCreateDTO,
  EmployerUpdateDTO,
  EmployerFindAllDTO,
} from 'src/app/dtos/Employer.dto';
import { EmployerPresenter } from 'src/app/modules/Employer/Employer.presenter';
import { EmployerHandle } from 'src/app/handles/Employer/Employer.handle';
import { FindAllPresent } from 'src/shared/FindAll.presenter';
import { EmployerNotFoundException } from 'src/app/errors/Employer.error';
import { Public } from 'src/app/decorators/public';

@Injectable()
@ApiTags('Colaboradores da Barbearia (Employer)')
@Controller('employer')
@Public()
export class EmployerController {
  constructor(private readonly employerHandle: EmployerHandle) {}

  @Post()
  @ApiOperation({ summary: 'Cria um Employer' })
  @ApiResponse({ type: EmployerPresenter })
  @ApiException(() => [])
  async createOneEmployer(
    @Body() newEmployer: EmployerCreateDTO,
  ): Promise<EmployerPresenter> {
    return this.employerHandle.createOneEmployer(newEmployer);
  }

  // @Put('/:employerId')
  // @ApiOperation({ summary: 'Atualiza dados de um Employer' })
  // @ApiResponse({ type: EmployerPresenter })
  // @ApiException(() => [EmployerNotFoundException])
  // async updateOneEmployer(
  //   @Param('employerId') employerId: string,
  //   @Body() dataEmployer: EmployerUpdateDTO,
  // ): Promise<EmployerPresenter> {
  //   return this.employerHandle.updateOneEmployer(employerId, dataEmployer);
  // }

  // @Get()
  // @ApiOperation({ summary: 'Lista de todos os Employers' })
  // @ApiResponse({ type: FindAllPresent.forEntity(EmployerPresenter) })
  // async getAllEmployer(
  //   @Query() queries: EmployerFindAllDTO,
  // ): Promise<FindAllPresent<EmployerPresenter>> {
  //   return this.employerHandle.findAllEmployer(queries);
  // }

  // @Get('/:employerId')
  // @ApiOperation({ summary: 'Obtém dados de um Employer' })
  // @ApiResponse({ type: EmployerPresenter })
  // @ApiException(() => [EmployerNotFoundException])
  // async getOneEmployerById(
  //   @Param('employerId') employerId: string,
  // ): Promise<EmployerPresenter> {
  //   return this.employerHandle.findOneEmployerById(employerId);
  // }
}
