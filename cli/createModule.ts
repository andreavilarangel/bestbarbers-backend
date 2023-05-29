import { cancel } from '@clack/prompts';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const fs = require('fs');

export const createModule = (name: string) => {
  const dir = `src/app/modules/${name}`;

  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }

  const nameLowerCase = name.charAt(0).toLowerCase() + name.slice(1);

  const contentController = `
import { ApiException } from '@nanogiants/nestjs-swagger-api-exception-decorator'
import {
  Body,
  Controller,
  Get,
  Injectable,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common'
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'
import { ${name}CreateDTO, ${name}UpdateDTO, ${name}FindAllDTO} from 'src/app/dtos/${name}.dto'
import { ${name}Presenter } from 'src/app/modules/${name}/${name}.presenter'
import { ${name}Handle } from 'src/app/handles/${name}/${name}.handle'
import { FindAllPresent } from 'src/shared/FindAll.presenter'
import { ${name}NotFoundException } from 'src/app/errors/${name}.error'


@Injectable()
@ApiTags('${name}')
@Controller('${nameLowerCase}')
export class ${name}Controller {
  constructor(private readonly ${nameLowerCase}Handle: ${name}Handle) {}

  @Post()
  @ApiOperation({ summary: 'Cria um ${name}' })
  @ApiResponse({ type: ${name}Presenter })
  @ApiException(() => [])
  async createOne${name}(@Body() new${name}: ${name}CreateDTO): Promise<${name}Presenter> {
    return this.${nameLowerCase}Handle.createOne${name}(new${name})
  }

  @Put('/:${nameLowerCase}Id')
  @ApiOperation({ summary: 'Atualiza dados de um ${name}' })
  @ApiResponse({ type: ${name}Presenter })
  @ApiException(() => [${name}NotFoundException])
  async updateOne${name}(
    @Param('${nameLowerCase}Id') ${nameLowerCase}Id: string,
    @Body() data${name}: ${name}UpdateDTO,
  ): Promise<${name}Presenter> {
    return this.${nameLowerCase}Handle.updateOne${name}(${nameLowerCase}Id, data${name})
  }


  @Get()
  @ApiOperation({ summary: 'Lista de todos os ${name}s' })
  @ApiResponse({ type: FindAllPresent.forEntity(${name}Presenter) })
  async getAll${name}(@Query() queries: ${name}FindAllDTO): Promise<FindAllPresent<${name}Presenter>> {
    return this.${nameLowerCase}Handle.findAll${name}(queries)
  }

  @Get('/:${nameLowerCase}Id')
  @ApiOperation({ summary: 'Obtém dados de um ${name}' })
  @ApiResponse({ type: ${name}Presenter })
  @ApiException(() => [${name}NotFoundException])
  async getOne${name}ById(@Param('${nameLowerCase}Id') ${nameLowerCase}Id: string): Promise<${name}Presenter> {
    return this.${nameLowerCase}Handle.findOne${name}ById(${nameLowerCase}Id)
  }
}
`;
  fs.writeFile(`${dir}/${name}.controller.ts`, contentController, (err) => {
    if (err) {
      console.error(err);
      cancel('Operation cancelled.');
      process.exit(0);
    }
    // ficheiro escrito com sucesso
  });

  const contentModule = `
import { Module } from '@nestjs/common'
import { ${name}HandleModule } from 'src/app/handles/${name}/${name}Handle.module'
import { RepositoriesModule } from 'src/app/repositories.module'
import { ${name}Controller } from './${name}.controller'

@Module({
  imports: [RepositoriesModule, ${name}HandleModule],
  controllers: [${name}Controller],
})
export class ${name}Module {}
`;

  fs.writeFile(`${dir}/${name}.module.ts`, contentModule, (err) => {
    if (err) {
      console.error(err);
      cancel('Operation cancelled.');
      process.exit(0);
    }
    // ficheiro escrito com sucesso
  });
};
