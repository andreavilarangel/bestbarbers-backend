import { Injectable } from '@nestjs/common'
import { BarbershopUpdateDTO } from 'src/app/dtos/Barbershop.dto'
import { BarbershopPresenter } from 'src/app/presenter/Barbershop.presenter'
import { BarbershopRepository } from 'src/core/repositories/Barbershop.repository'
import { BarbershopFindService } from './BarbershopFind.service'
import { BarbershopUpdateServiceInterface } from './BarbershopHandle.interface'

@Injectable()
export class BarbershopUpdateService implements BarbershopUpdateServiceInterface {
  constructor(
    private readonly barbershopRepository: BarbershopRepository,
    private readonly barbershopFindService: BarbershopFindService,
  ) {}

  async updateOneBarbershop(barbershopId: string, dataBarbershop: BarbershopUpdateDTO): Promise<BarbershopPresenter> {   
    // valida se existe Barbershop
    await this.barbershopFindService.findOneBarbershopById(barbershopId)

    return this.barbershopRepository.update(barbershopId, dataBarbershop)
  }
}
