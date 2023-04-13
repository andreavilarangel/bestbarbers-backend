import { cancel } from '@clack/prompts'
// eslint-disable-next-line @typescript-eslint/no-var-requires
const fs = require('fs')

export const createError = (name: string) => {
  const dir = `src/app/errors`

  /*  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true })
  }  */

  const content = `
import {
  AlreadyExistException,
  BadException,
  NotFoundException,
} from './error.exception'

const prefix = '${name.split('')[0]}'

export class ${name}NotFoundException extends NotFoundException {
  constructor(data?: any) {
    super(
      {
        message: '${name} não existe',
        prefix,
      },
      data,
    )
  }
}

export class ${name}AlreadyExistException extends AlreadyExistException {
  constructor(data?: any) {
    super(
      {
        message: '${name} ja existe',
        prefix,
      },
      data,
    )
  }
}

export class ${name}BadRequestException extends BadException {
  constructor(message, data?: any) {
    super(
      {
        message: message || 'não foi possível atualizar o ${name.toLocaleLowerCase()}',
        prefix,
      },
      data,
    )
  }
}  
`
  fs.writeFile(`${dir}/${name}.error.ts`, content, err => {
    if (err) {
      console.error(err)
      cancel('Operation cancelled.')
      process.exit(0)
    }
    // ficheiro escrito com sucesso
  })
}
