import { intro, outro, select, text, spinner, cancel } from '@clack/prompts';
import { createDtoAndPresenter } from './createDtoAndPresenter';
import { createEntity } from './createEntity';
import { createError } from './createError';
import { createHandles } from './createHandle';
import { createModule } from './createModule';
import { createRepository } from './createRepository';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const shell = require('shelljs');
const s = spinner();

enum Options {
  MODULE = 'MODULE',
  ENTITY = 'ENTITY',
  REPOSITORY = 'REPOSITORY',
  HANDLE = 'HANDLE',
  ERROR = 'ERROR',
  DTO_AND_PRESENTER = 'DTO_AND_PRESENTER',
  CRUD = 'CRUD',
}

const additionalTools = async () =>
  await select({
    message: 'O que você quer adicionar?',
    options: [
      {
        value: Options.ENTITY,
        label: 'Entidade',
        hint: 'classe mapeada pelo prisma',
      },
      {
        value: Options.REPOSITORY,
        label: 'Repositorio',
        hint: 'Class com metodos de acesso ao banco(prisma)',
      },
      {
        value: Options.DTO_AND_PRESENTER,
        label: 'Dtos e Presenters',
        // hint: 'Class com metodos de acesso ao banco(prisma)',
      },
      {
        value: Options.HANDLE,
        label: 'Handle e Services',
        hint: 'Funções para lidar com as regras de negocio',
      },
      {
        value: Options.ERROR,
        label: 'Error exception',
        hint: 'Erros exceptions especifico para uma entidade',
      },
      {
        value: Options.MODULE,
        label: 'Modulo da aplicação',
        hint: 'moldule and controllers',
      },
      {
        value: Options.CRUD,
        label: 'Criar um CRUD',
        hint: 'Criar um CRUD completo seguindo a arquitetura',
      },
    ],
  });

const name = async () =>
  await text({
    message: 'Qual o nome para o modulo?',
    validate(value) {
      if (value.length === 0) return `Value is required!`;
      if (typeof value !== 'string') return 'Value have be a string';
    },
  });

const execute = (operation, nameModule) => {
  switch (operation) {
    case Options.ENTITY:
      createEntity(nameModule as string);
      break;
    case Options.REPOSITORY:
      createRepository(nameModule as string);
      break;
    case Options.DTO_AND_PRESENTER:
      createDtoAndPresenter(nameModule as string);
      break;
    case Options.ERROR:
      createError(nameModule as string);
      break;
    case Options.HANDLE:
      createHandles(nameModule as string);
      break;
    case Options.MODULE:
      createModule(nameModule as string);
      break;
    case Options.CRUD:
      createEntity(nameModule as string);
      createRepository(nameModule as string);
      createDtoAndPresenter(nameModule as string);
      createError(nameModule as string);
      createHandles(nameModule as string);
      createModule(nameModule as string);
      break;

    default:
      break;
  }
};

const formatNameModule = (name: string) => {
  const [firstLetter] = name.split('');

  return firstLetter.toLocaleUpperCase() + name.substring(1);
};

async function cli() {
  intro('Cli Carroweb');

  const optionSelected = await additionalTools();
  const nameModule = (await name()) as string;

  await s.start('Criando arquivos');
  execute(optionSelected, formatNameModule(nameModule));

  /*  const run = `yarn prettier --write .`

  if (shell.exec(run).code !== 0) {
    shell.exit(1)
    cancel('Error ao criar modulo')
  } */
  s.stop('Arquivos criados');

  outro(`Tudo Pronto!`);
}

cli();
