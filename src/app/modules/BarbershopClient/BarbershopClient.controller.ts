import { ApiException } from '@nanogiants/nestjs-swagger-api-exception-decorator';
import { Body, Controller, Injectable, Post, Delete } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { BarbershopClientCreateDTO } from 'src/app/modules/BarbershopClient/BarbershopClient.dto';
import { BarbershopClientPresenter } from 'src/app/modules/BarbershopClient/BarbershopClient.presenter';
import { BarbershopClientHandle } from 'src/app/handles/BarbershopClient/BarbershopClient.handle';
import { BarbershopClientNotFoundException } from 'src/app/handles/BarbershopClient/BarbershopClient.error';
import { Public } from 'src/app/decorators/public';

@Public()
@Injectable()
@ApiTags('Clientes da barbearia (BarbershopClient)')
@Controller('barbershop-client')
export class BarbershopClientController {
  constructor(
    private readonly barbershopClientHandle: BarbershopClientHandle,
  ) {}

  @Post('create')
  @ApiOperation({ summary: 'Cria um cliente da barbearia' })
  @ApiResponse({ type: BarbershopClientPresenter })
  @ApiException(() => [])
  async createOneBarbershopClient(
    @Body() newBarbershopClient: BarbershopClientCreateDTO,
  ): Promise<BarbershopClientPresenter> {
    return this.barbershopClientHandle.createOneBarbershopClient(
      newBarbershopClient,
    );
  }

  @Delete('/delete')
  @ApiOperation({ summary: 'Exclui o cliente de uma barbearia' })
  @ApiResponse({ type: BarbershopClientPresenter })
  @ApiException(() => [BarbershopClientNotFoundException])
  async updateOneBarbershopClient(
    @Body() data: any,
  ): Promise<BarbershopClientPresenter> {
    return this.barbershopClientHandle.deleteBarbershopClient(data);
  }
}
