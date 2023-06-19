import { ApiException } from '@nanogiants/nestjs-swagger-api-exception-decorator';
import {
  Body,
  Controller,
  Get,
  Injectable,
  Param,
  Post,
  Put,
  Delete,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import {
  ProductCreateDTO,
  ProductUpdateDTO,
} from 'src/app/modules/Product/Product.dto';
import { ProductPresenter } from 'src/app/modules/Product/Product.presenter';
import { ProductHandle } from 'src/app/handles/Product/Product.handle';
import { FindAllPresent } from 'src/shared/FindAll.presenter';
import { ProductNotFoundException } from 'src/app/modules/Product/Product.error';

@Injectable()
@ApiTags('Product')
@Controller('product')
export class ProductController {
  constructor(private readonly productHandle: ProductHandle) {}

  @Post()
  @ApiOperation({ summary: 'Cria um Product' })
  @ApiResponse({ type: ProductPresenter })
  @ApiException(() => [])
  async createOneProduct(
    @Body() newProduct: ProductCreateDTO,
  ): Promise<ProductPresenter> {
    return this.productHandle.createOneProduct(newProduct);
  }

  @Put('/:productId')
  @ApiOperation({ summary: 'Atualiza dados de um Product' })
  @ApiResponse({ type: ProductPresenter })
  @ApiException(() => [ProductNotFoundException])
  async updateOneProduct(
    @Param('productId') productId: string,
    @Body() dataProduct: ProductUpdateDTO,
  ): Promise<ProductPresenter> {
    return this.productHandle.updateOneProduct(productId, dataProduct);
  }

  @Get('/:barbershop_id')
  @ApiOperation({ summary: 'Lista de todos os produtos de uma barbearia' })
  @ApiResponse({ type: FindAllPresent.forEntity(ProductPresenter) })
  async getBarbershopProducts(
    @Param('barbershop_id') barbershop_id: string,
  ): Promise<FindAllPresent<ProductPresenter>> {
    return this.productHandle.findBarbershopProducts(barbershop_id);
  }

  @Delete('/delete/:product_id')
  @ApiOperation({ summary: 'Exclui um produto' })
  @ApiResponse({ type: ProductPresenter })
  @ApiException(() => [ProductNotFoundException])
  async deleteOneProductAndService(
    @Param('product_id') productId: string,
  ): Promise<ProductPresenter> {
    return this.productHandle.deleteOneProduct(productId);
  }
}
