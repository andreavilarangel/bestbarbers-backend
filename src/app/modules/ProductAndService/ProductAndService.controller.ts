import { ApiException } from '@nanogiants/nestjs-swagger-api-exception-decorator';
import {
  Body,
  Controller,
  Get,
  Injectable,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import {
  ProductAndServiceCreateDTO,
  ProductAndServiceUpdateDTO,
  ProductAndServiceFindAllDTO,
} from 'src/app/dtos/ProductAndService.dto';
import { ProductAndServicePresenter } from 'src/app/modules/ProductAndService/ProductAndService.presenter';
import { ProductAndServiceHandle } from 'src/app/handles/ProductAndService/ProductAndService.handle';
import { FindAllPresent } from 'src/shared/FindAll.presenter';
import { ProductAndServiceNotFoundException } from 'src/app/errors/ProductAndService.error';
import { Public } from 'src/app/decorators/public';

@Injectable()
@ApiTags('ProductAndService')
@Controller('productAndService')
@Public()
export class ProductAndServiceController {
  constructor(
    private readonly productAndServiceHandle: ProductAndServiceHandle,
  ) {}

  @Post()
  @ApiOperation({ summary: 'Cria um ProductAndService' })
  @ApiResponse({ type: ProductAndServicePresenter })
  @ApiException(() => [])
  async createOneProductAndService(
    @Body() newProductAndService: ProductAndServiceCreateDTO,
  ): Promise<ProductAndServicePresenter> {
    return this.productAndServiceHandle.createOneProductAndService(
      newProductAndService,
    );
  }

  @Put('/:productAndServiceId')
  @ApiOperation({ summary: 'Atualiza dados de um ProductAndService' })
  @ApiResponse({ type: ProductAndServicePresenter })
  @ApiException(() => [ProductAndServiceNotFoundException])
  async updateOneProductAndService(
    @Param('productAndServiceId') productAndServiceId: string,
    @Body() dataProductAndService: ProductAndServiceUpdateDTO,
  ): Promise<ProductAndServicePresenter> {
    return this.productAndServiceHandle.updateOneProductAndService(
      productAndServiceId,
      dataProductAndService,
    );
  }

  @Get()
  @ApiOperation({ summary: 'Lista de todos os ProductAndServices' })
  @ApiResponse({ type: FindAllPresent.forEntity(ProductAndServicePresenter) })
  async getAllProductAndService(
    @Query() queries: ProductAndServiceFindAllDTO,
  ): Promise<FindAllPresent<ProductAndServicePresenter>> {
    return this.productAndServiceHandle.findAllProductAndService(queries);
  }

  @Get('/:productAndServiceId')
  @ApiOperation({ summary: 'Obtém dados de um ProductAndService' })
  @ApiResponse({ type: ProductAndServicePresenter })
  @ApiException(() => [ProductAndServiceNotFoundException])
  async getOneProductAndServiceById(
    @Param('productAndServiceId') productAndServiceId: string,
  ): Promise<ProductAndServicePresenter> {
    return this.productAndServiceHandle.findOneProductAndServiceById(
      productAndServiceId,
    );
  }
}
