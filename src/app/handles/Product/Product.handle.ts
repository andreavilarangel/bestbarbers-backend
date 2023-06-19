import { Injectable } from '@nestjs/common';
import { omit } from 'radash';
import {
  ProductCreateDTO,
  ProductUpdateDTO,
} from 'src/app/modules/Product/Product.dto';
import { FindAllPresent } from 'src/shared/FindAll.presenter';
import { BarbershopHandle } from '../Barbershop/Barbershop.handle';
import { ProductPresenter } from 'src/app/modules/Product/Product.presenter';
import { ProductRepository } from 'src/app/modules/Product/Product.repository';
import { ProductNotFoundException } from 'src/app/modules/Product/Product.error';

@Injectable()
export class ProductHandle {
  constructor(
    private readonly productRepository: ProductRepository,
    private readonly barbershopHandle: BarbershopHandle,
  ) {}

  async createOneProduct(
    newProduct: ProductCreateDTO,
  ): Promise<ProductPresenter> {
    const { barbershop_id } = newProduct;
    await this.barbershopHandle.findOneBarbershopById(barbershop_id);

    return this.productRepository.create({
      ...omit(newProduct, ['barbershop_id']),
      barbershop: { connect: { id: barbershop_id } },
    });
  }

  async updateOneProduct(
    productId: string,
    dataProduct: ProductUpdateDTO,
  ): Promise<ProductPresenter> {
    await this.findOneProductById(productId);
    return this.productRepository.update(productId, dataProduct);
  }

  async findOneProductById(productId: string): Promise<ProductPresenter> {
    const productAndService = await this.productRepository.findOne(productId);
    if (!productAndService) throw new ProductNotFoundException({ productId });
    return productAndService;
  }

  async findBarbershopProducts(
    barbershop_id: string,
  ): Promise<FindAllPresent<ProductPresenter>> {
    const [data, total] = await this.productRepository.findAll({
      where: {
        barbershop_id,
        inactive: false,
      },
    });
    return {
      data,
      total,
    };
  }

  async deleteOneProduct(productId: string): Promise<ProductPresenter> {
    // valida se existe ProductAndService
    await this.findOneProductById(productId);
    return this.productRepository.update(productId, {
      inactive: true,
    });
  }
}
