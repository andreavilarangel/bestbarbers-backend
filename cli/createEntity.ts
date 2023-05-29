import { cancel } from '@clack/prompts';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const fs = require('fs');

export const createEntity = (name: string) => {
  const dir = `src/app/modules/${name}`;

  const content = `
import { ${name} } from '@prisma/client'
import { IsUUID, IsOptional, IsString, IsInt } from 'class-validator'
import { ApiPropertyOptional, ApiProperty } from '@nestjs/swagger'

export class ${name}Entity implements ${name} {
  @IsUUID()
  @IsOptional()
  @ApiPropertyOptional({ example: 'e7cc7b24-27a5-4f1e-bba3-d7531cf965a0' })
  id: string

  @IsOptional()
  @ApiProperty({ example: '2023-03-16T21:21:51.875Z' })
  created_at: Date

  @IsOptional()
  @ApiProperty({ example: '2023-03-16T21:21:51.875Z' })
  updated_at: Date
}
  `;

  fs.writeFile(`${dir}/${name}.entity.ts`, content, (err) => {
    if (err) {
      console.error(err);
      cancel('Operation cancelled.');
      process.exit(0);
    }
    // ficheiro escrito com sucesso
  });
};
