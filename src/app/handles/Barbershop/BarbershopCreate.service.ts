import { Injectable } from '@nestjs/common';
import { BarbershopCreateDTO } from 'src/app/dtos/Barbershop.dto';
import { BarbershopPresenter } from 'src/app/presenter/Barbershop.presenter';
import { BarbershopRepository } from 'src/core/repositories/Barbershop.repository';
import { BarbershopCreateServiceInterface } from './BarbershopHandle.interface';

@Injectable()
export class BarbershopCreateService
  implements BarbershopCreateServiceInterface
{
  constructor(private readonly barbershopRepository: BarbershopRepository) {}

  async createOneBarbershop(
    newBarbershop: BarbershopCreateDTO,
  ): Promise<BarbershopPresenter> {
    return this.barbershopRepository.create(newBarbershop);
  }
}
