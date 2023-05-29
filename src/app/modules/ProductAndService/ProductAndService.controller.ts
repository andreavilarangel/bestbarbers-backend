import { ApiException } from '@nanogiants/nestjs-swagger-api-exception-decorator';
import {
  Body,
  Controller,
  Delete,
  Get,
  Injectable,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import {
  ProductAndServiceCreateDTO,
  ProductAndServiceUpdateDTO,
} from 'src/app/dtos/ProductAndService.dto';
import { ProductAndServicePresenter } from 'src/app/modules/ProductAndService/ProductAndService.presenter';
import { ProductAndServiceHandle } from 'src/app/handles/ProductAndService/ProductAndService.handle';
import { FindAllPresent } from 'src/shared/FindAll.presenter';
import { ProductAndServiceNotFoundException } from 'src/app/errors/ProductAndService.error';
import { Public } from 'src/app/decorators/public';

@Injectable()
@ApiTags('Produtos e serviços da Barbearia (ProductAndService)')
@Controller('product-and-service')
@Public()
export class ProductAndServiceController {
  constructor(
    private readonly productAndServiceHandle: ProductAndServiceHandle,
  ) {}

  @Post()
  @ApiOperation({ summary: 'Cria um produto ou serviço' })
  @ApiResponse({ type: ProductAndServicePresenter })
  @ApiException(() => [])
  async createOneProductAndService(
    @Body() newProductAndService: ProductAndServiceCreateDTO,
  ): Promise<ProductAndServicePresenter> {
    return this.productAndServiceHandle.createOneProductAndService(
      newProductAndService,
    );
  }

  @Put('/:product_and_service_id')
  @ApiOperation({ summary: 'Atualiza dados de um produto ou serviço' })
  @ApiResponse({ type: ProductAndServicePresenter })
  @ApiException(() => [ProductAndServiceNotFoundException])
  async updateOneProductAndService(
    @Param('product_and_service_id') productAndServiceId: string,
    @Body() dataProductAndService: ProductAndServiceUpdateDTO,
  ): Promise<ProductAndServicePresenter> {
    return this.productAndServiceHandle.updateOneProductAndService(
      productAndServiceId,
      dataProductAndService,
    );
  }

  @Get('services/:barbershop_id')
  @ApiOperation({ summary: 'Lista de todos os serviços de uma barbearia' })
  @ApiResponse({ type: FindAllPresent.forEntity(ProductAndServicePresenter) })
  async getBarbershopServices(
    @Param('barbershop_id') barbershop_id: string,
  ): Promise<FindAllPresent<ProductAndServicePresenter>> {
    return this.productAndServiceHandle.findBarbershopServices(barbershop_id);
  }

  @Get('products/:barbershop_id')
  @ApiOperation({ summary: 'Lista de todos os produtos de uma barbearia' })
  @ApiResponse({ type: FindAllPresent.forEntity(ProductAndServicePresenter) })
  async getBarbershopProducts(
    @Param('barbershop_id') barbershop_id: string,
  ): Promise<FindAllPresent<ProductAndServicePresenter>> {
    return this.productAndServiceHandle.findBarbershopProducts(barbershop_id);
  }

  @Delete('/delete/:product_and_service_id')
  @ApiOperation({ summary: 'Exclui um produto ou serviço' })
  @ApiResponse({ type: ProductAndServicePresenter })
  @ApiException(() => [ProductAndServiceNotFoundException])
  async deleteOneProductAndService(
    @Param('product_and_service_id') productAndServiceId: string,
  ): Promise<ProductAndServicePresenter> {
    return this.productAndServiceHandle.deleteOneProductAndService(
      productAndServiceId,
    );
  }
}
