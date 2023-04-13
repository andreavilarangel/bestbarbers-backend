import { cancel } from '@clack/prompts';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const fs = require('fs');

export const createDtoAndPresenter = (name: string) => {
  const dirDto = `src/app/dtos`;

  const contentDTO = `import { OmitType, PartialType } from '@nestjs/swagger'
import { PaginationDTO } from './Pagination.dto'
import { ${name}Entity } from 'src/core/entities/${name}.entity'

export class ${name}CreateDTO extends OmitType(${name}Entity, ['id', 'created_at', 'updated_at']) {}

export class ${name}UpdateDTO extends PartialType(${name}CreateDTO) {}

export class ${name}FindAllDTO extends PaginationDTO {}
`;
  fs.writeFile(`${dirDto}/${name}.dto.ts`, contentDTO, (err) => {
    if (err) {
      console.error(err);
      cancel('Operation cancelled.');
      process.exit(0);
    }
    // ficheiro escrito com sucesso
  });

  const dirPresenter = `src/app/presenter`;

  const contentPresenter = `import { ${name}Entity } from 'src/core/entities/${name}.entity'

export class ${name}Presenter extends ${name}Entity {}
`;
  fs.writeFile(
    `${dirPresenter}/${name}.presenter.ts`,
    contentPresenter,
    (err) => {
      if (err) {
        console.error(err);
        cancel('Operation cancelled.');
        process.exit(0);
      }
      // ficheiro escrito com sucesso
    },
  );
};