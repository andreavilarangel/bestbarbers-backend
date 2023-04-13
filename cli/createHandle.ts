/* eslint-disable prettier/prettier */
import { cancel } from '@clack/prompts'
// eslint-disable-next-line @typescript-eslint/no-var-requires
const fs = require('fs')

const createInterfaceHandle = (dir, name: string) => {
  const contentInterface = `import {${name}CreateDTO, ${name}UpdateDTO, ${name}FindAllDTO} from 'src/app/dtos/${name}.dto'
import { FindAllPresent } from 'src/app/presenter/FindAll.presenter'
import { ${name}Presenter } from 'src/app/presenter/${name}.presenter'

export interface ${name}CreateServiceInterface {
  createOne${name}(new${name}: ${name}CreateDTO): Promise<${name}Presenter>
}

export interface ${name}UpdateServiceInterface {
  updateOne${name}(${
    name.charAt(0).toLowerCase() + name.slice(1)
  }Id: string, data${name}: ${name}UpdateDTO): Promise<${name}Presenter>
}

export interface ${name}FindServiceInterface {
  findOne${name}ById(${
    name.charAt(0).toLowerCase() + name.slice(1)
  }Id: string): Promise<${name}Presenter>
  findAll${name}(params: ${name}FindAllDTO): Promise<FindAllPresent<${name}Presenter>>
}

export interface ${name}HandleInterface
  extends ${name}CreateServiceInterface,
    ${name}UpdateServiceInterface,
    ${name}FindServiceInterface {}
`

  fs.writeFile(`${dir}/${name}Handle.interface.ts`, contentInterface, err => {
    if (err) {
      console.error(err)
      cancel('Operation cancelled.')
      process.exit(0)
    }
    // ficheiro escrito com sucesso
  })
}

const createCreateService = (dir, name: string) => {
  const content = `import { Injectable } from '@nestjs/common'
import { ${name}CreateDTO } from 'src/app/dtos/${name}.dto'
import { ${name}Presenter } from 'src/app/presenter/${name}.presenter'
import { ${name}Repository } from 'src/core/repositories/${name}.repository'
import { ${name}CreateServiceInterface } from './${name}Handle.interface'

@Injectable()
export class ${name}CreateService implements ${name}CreateServiceInterface {
  constructor(private readonly ${
    name.charAt(0).toLowerCase() + name.slice(1)
  }Repository: ${name}Repository) {}

  async createOne${name}(new${name}: ${name}CreateDTO): Promise<${name}Presenter> {   
    return this.${
      name.charAt(0).toLowerCase() + name.slice(1)
    }Repository.create(new${name})
  }
}
`

  fs.writeFile(`${dir}/${name}Create.service.ts`, content, err => {
    if (err) {
      console.error(err)
      cancel('Operation cancelled.')
      process.exit(0)
    }
    // ficheiro escrito com sucesso
  })
}

const createUpdateService = (dir, name: string) => {
  const content = `import { Injectable } from '@nestjs/common'
import { ${name}UpdateDTO } from 'src/app/dtos/${name}.dto'
import { ${name}Presenter } from 'src/app/presenter/${name}.presenter'
import { ${name}Repository } from 'src/core/repositories/${name}.repository'
import { ${name}FindService } from './${name}Find.service'
import { ${name}UpdateServiceInterface } from './${name}Handle.interface'

@Injectable()
export class ${name}UpdateService implements ${name}UpdateServiceInterface {
  constructor(
    private readonly ${
      name.charAt(0).toLowerCase() + name.slice(1)
    }Repository: ${name}Repository,
    private readonly ${
      name.charAt(0).toLowerCase() + name.slice(1)
    }FindService: ${name}FindService,
  ) {}

  async updateOne${name}(${
    name.charAt(0).toLowerCase() + name.slice(1)
  }Id: string, data${name}: ${name}UpdateDTO): Promise<${name}Presenter> {   
    // valida se existe ${name}
    await this.${
      name.charAt(0).toLowerCase() + name.slice(1)
    }FindService.findOne${name}ById(${
    name.charAt(0).toLowerCase() + name.slice(1)
  }Id)

    return this.${
      name.charAt(0).toLowerCase() + name.slice(1)
    }Repository.update(${
    name.charAt(0).toLowerCase() + name.slice(1)
  }Id, data${name})
  }
}
`

  fs.writeFile(`${dir}/${name}Update.service.ts`, content, err => {
    if (err) {
      console.error(err)
      cancel('Operation cancelled.')
      process.exit(0)
    }
    // ficheiro escrito com sucesso
  })
}

const createFindService = (dir, name: string) => {
  const content = `import { Injectable } from '@nestjs/common'
import { ${name}FindAllDTO } from 'src/app/dtos/${name}.dto'
import { ${name}Presenter } from 'src/app/presenter/${name}.presenter'
import { FindAllPresent } from 'src/app/presenter/FindAll.presenter'
import { ${name}Repository } from 'src/core/repositories/${name}.repository'
import { ${name}FindServiceInterface } from './${name}Handle.interface'
import { ${name}NotFoundException } from 'src/app/errors/${name}.error'

@Injectable()
export class ${name}FindService implements ${name}FindServiceInterface {
  constructor(private readonly ${
    name.charAt(0).toLowerCase() + name.slice(1)
  }Repository: ${name}Repository) {}

  async findOne${name}ById(${
    name.charAt(0).toLowerCase() + name.slice(1)
  }Id: string): Promise<${name}Presenter> {   
    const ${name.charAt(0).toLowerCase() + name.slice(1)} = await this.${
    name.charAt(0).toLowerCase() + name.slice(1)
  }Repository.findOne(${name.charAt(0).toLowerCase() + name.slice(1)}Id)

    if (!${
      name.charAt(0).toLowerCase() + name.slice(1)
    }) throw new ${name}NotFoundException({ ${
    name.charAt(0).toLowerCase() + name.slice(1)
  }Id })

    return ${name.charAt(0).toLowerCase() + name.slice(1)}
  }

  async findAll${name}(params: ${name}FindAllDTO): Promise<FindAllPresent<${name}Presenter>> {
      const [data, total] = await this.${
        name.charAt(0).toLowerCase() + name.slice(1)
      }Repository.findAll({
      skip: params.skip,
      take: params.take,
      where: {},
    })

    return {
      data,
      total,
    }  
  }
}
`

  fs.writeFile(`${dir}/${name}Find.service.ts`, content, err => {
    if (err) {
      console.error(err)
      cancel('Operation cancelled.')
      process.exit(0)
    }
    // ficheiro escrito com sucesso
  })
}

const createHandle = (dir, name: string) => {
  const content = `import { Injectable } from '@nestjs/common'
import {${name}CreateDTO, ${name}UpdateDTO, ${name}FindAllDTO} from 'src/app/dtos/${name}.dto'
import { FindAllPresent } from 'src/app/presenter/FindAll.presenter'
import { ${name}Presenter } from 'src/app/presenter/${name}.presenter'
import { ${name}CreateService } from './${name}Create.service'
import { ${name}FindService } from './${name}Find.service'
import { ${name}HandleInterface } from './${name}Handle.interface'
import { ${name}UpdateService } from './${name}Update.service'

@Injectable()
export class ${name}Handle implements ${name}HandleInterface {
  constructor(
    private readonly ${
      name.charAt(0).toLowerCase() + name.slice(1)
    }Create: ${name}CreateService,
    private readonly ${
      name.charAt(0).toLowerCase() + name.slice(1)
    }Update: ${name}UpdateService,
    private readonly ${
      name.charAt(0).toLowerCase() + name.slice(1)
    }Find: ${name}FindService,
  ) {}

  async createOne${name}(new${name}: ${name}CreateDTO): Promise<${name}Presenter> {
    return this.${
      name.charAt(0).toLowerCase() + name.slice(1)
    }Create.createOne${name}(new${name})
  }

  async updateOne${name}(
    ${name.charAt(0).toLowerCase() + name.slice(1)}Id: string,
    data${name}: ${name}UpdateDTO,
  ): Promise<${name}Presenter> {
    return this.${
      name.charAt(0).toLowerCase() + name.slice(1)
    }Update.updateOne${name}(${
    name.charAt(0).toLowerCase() + name.slice(1)
  }Id, data${name})
  }

  async findOne${name}ById(${
    name.charAt(0).toLowerCase() + name.slice(1)
  }Id: string): Promise<${name}Presenter> {
    return this.${
      name.charAt(0).toLowerCase() + name.slice(1)
    }Find.findOne${name}ById(${name.charAt(0).toLowerCase() + name.slice(1)}Id)
  }

  async findAll${name}(
    params: ${name}FindAllDTO,
  ): Promise<FindAllPresent<${name}Presenter>> {
    return this.${
      name.charAt(0).toLowerCase() + name.slice(1)
    }Find.findAll${name}(params)
  }
}
`

  fs.writeFile(`${dir}/${name}.handle.ts`, content, err => {
    if (err) {
      console.error(err)
      cancel('Operation cancelled.')
      process.exit(0)
    }
    // ficheiro escrito com sucesso
  })
}

const createModule = (dir, name: string) => {
  const content = `import { Module } from '@nestjs/common'
import { RepositoriesModule } from 'src/core/repositories/repositories.module'
import { ${name}Handle } from './${name}.handle'
import { ${name}CreateService } from './${name}Create.service'
import { ${name}FindService } from './${name}Find.service'
import { ${name}UpdateService } from './${name}Update.service'

@Module({
  imports: [RepositoriesModule],
  providers: [
    ${name}Handle,
    ${name}CreateService,
    ${name}UpdateService,
    ${name}FindService,
  ],
  exports: [${name}Handle, ${name}CreateService, ${name}UpdateService, ${name}FindService],
})
export class ${name}HandleModule {}
`

  fs.writeFile(`${dir}/${name}Handle.module.ts`, content, err => {
    if (err) {
      console.error(err)
      cancel('Operation cancelled.')
      process.exit(0)
    }
    // ficheiro escrito com sucesso
  })
}

export const createHandles = (name: string) => {
  const dir = `src/app/handles/${name}`

  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true })
  }

  createInterfaceHandle(dir, name)
  createCreateService(dir, name)
  createUpdateService(dir, name)
  createFindService(dir, name)
  createHandle(dir, name)
  createModule(dir, name)
}
