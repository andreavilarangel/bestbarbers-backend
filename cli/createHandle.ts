/* eslint-disable prettier/prettier */
import { cancel } from '@clack/prompts';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const fs = require('fs');

const createHandle = (dir, name: string) => {
  const content = `import { Injectable } from '@nestjs/common'
import {${name}CreateDTO, ${name}UpdateDTO, ${name}FindAllDTO} from 'src/app/dtos/${name}.dto'
import { FindAllPresent } from 'src/shared/FindAll.presenter'
import { ${name}Presenter } from 'src/app/modules/${name}/${name}.presenter'
import { ${name}Repository } from 'src/app/modules/${name}/${name}.repository'

@Injectable()
export class ${name}Handle {
  constructor(
    private readonly ${
      name.charAt(0).toLowerCase() + name.slice(1)
    }Repository: ${name}Repository,
  ) {}

  async createOne${name}(new${name}: ${name}CreateDTO): Promise<${name}Presenter> {
    return this.${
      name.charAt(0).toLowerCase() + name.slice(1)
    }Repository.create(new${name})
  }

  async updateOne${name}(
    ${name.charAt(0).toLowerCase() + name.slice(1)}Id: string,
    data${name}: ${name}UpdateDTO,
  ): Promise<${name}Presenter> {
    return this.${
      name.charAt(0).toLowerCase() + name.slice(1)
    }Repository.update(${
    name.charAt(0).toLowerCase() + name.slice(1)
  }Id, data${name})
  }

  async findOne${name}ById(${
    name.charAt(0).toLowerCase() + name.slice(1)
  }Id: string): Promise<${name}Presenter> {
    return this.${
      name.charAt(0).toLowerCase() + name.slice(1)
    }Repository.findOne(${name.charAt(0).toLowerCase() + name.slice(1)}Id)
  }

  async findAll${name}(
    params: ${name}FindAllDTO,
  ): Promise<FindAllPresent<${name}Presenter>> {
    return this.${
      name.charAt(0).toLowerCase() + name.slice(1)
    }Repository.findAll(params)
  }
}
`;

  fs.writeFile(`${dir}/${name}.handle.ts`, content, (err) => {
    if (err) {
      console.error(err);
      cancel('Operation cancelled.');
      process.exit(0);
    }
    // ficheiro escrito com sucesso
  });
};

export const createHandles = (name: string) => {
  const dir = `src/app/handles/${name}`;

  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }

  createHandle(dir, name);
};
