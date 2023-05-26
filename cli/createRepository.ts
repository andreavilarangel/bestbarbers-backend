/* eslint-disable prettier/prettier */
import { cancel } from '@clack/prompts';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const fs = require('fs');

export const createRepository = (name: string) => {
  const dir = `src/app/modules/${name}`;

  const content = `import { Injectable } from '@nestjs/common'
import { Prisma } from '@prisma/client'
import { PrismaService } from 'src/infrastructure/database/prisma/prisma.service'
import {
  FindAllParamsType,
  FindAllResponseType,
} from 'src/shared/FindAll.type'
import { ${name}Entity } from './${name}.entity'

@Injectable()
export class ${name}Repository {
  constructor(private readonly prisma: PrismaService) {}

  async create(
    new${name}: Prisma.${name}CreateInput,
  ): Promise<${name}Entity> {
    return this.prisma.${name.charAt(0).toLowerCase() + name.slice(1)}.create({
      data: new${name},
    })
  }

  async update(
    ${name.charAt(0).toLowerCase() + name.slice(1)}Id: string,
    data${name}: Prisma.${name}UpdateInput,
  ): Promise<${name}Entity> {
    return this.prisma.${name.charAt(0).toLowerCase() + name.slice(1)}.update({
      where: {
        id: ${name.charAt(0).toLowerCase() + name.slice(1)}Id,
      },
      data: data${name},
    })
  }

  async findOne(${
    name.charAt(0).toLowerCase() + name.slice(1)
  }Id: string): Promise<${name}Entity> {
    return this.prisma. ${
      name.charAt(0).toLowerCase() + name.slice(1)
    }.findUnique({
      where: {
        id: ${name.charAt(0).toLowerCase() + name.slice(1)}Id
      },
    })
  }

  async findAll(
    params: FindAllParamsType<Prisma.${name}WhereInput>,
  ): Promise<FindAllResponseType<${name}Entity>> {
    return this.prisma.$transaction([
      this.prisma.${name.charAt(0).toLowerCase() + name.slice(1)}.findMany({
        skip: params.skip,
        take: params.take,
        where: params.where,
      }),
      this.prisma.${
        name.charAt(0).toLowerCase() + name.slice(1)
      }.count({ where: params.where }),
    ])
  }

  async delete(${
    name.charAt(0).toLowerCase() + name.slice(1)
  }Id: string): Promise<${name}Entity> {
    return this.prisma.${name.charAt(0).toLowerCase() + name.slice(1)}.delete({
      where: {
        id: ${name.charAt(0).toLowerCase() + name.slice(1)}Id,
      },
    })
  }
}

`;

  fs.writeFile(`${dir}/${name}.repository.ts`, content, (err) => {
    if (err) {
      console.error(err);
      cancel('Operation cancelled.');
      process.exit(0);
    }
    // ficheiro escrito com sucesso
  });
};
