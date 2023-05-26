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
  PaymentMethodCreateDTO,
  PaymentMethodUpdateDTO,
  PaymentMethodFindAllDTO,
} from 'src/app/dtos/PaymentMethod.dto';
import { PaymentMethodPresenter } from 'src/app/modules/PaymentMethod/PaymentMethod.presenter';
import { PaymentMethodHandle } from 'src/app/handles/PaymentMethod/PaymentMethod.handle';
import { FindAllPresent } from 'src/shared/FindAll.presenter';

import { PaymentMethodNotFoundException } from 'src/app/errors/PaymentMethod.error';
import { Public } from 'src/app/decorators/public';

@Injectable()
@ApiTags('PaymentMethod')
@Controller('payment-method')
@Public()
export class PaymentMethodController {
  constructor(private readonly paymentMethodHandle: PaymentMethodHandle) {}

  @Post()
  @ApiOperation({ summary: 'Cria um PaymentMethod' })
  @ApiResponse({ type: PaymentMethodPresenter })
  @ApiException(() => [])
  async createOnePaymentMethod(
    @Body() newPaymentMethod: PaymentMethodCreateDTO,
  ): Promise<PaymentMethodPresenter> {
    return this.paymentMethodHandle.createOnePaymentMethod(newPaymentMethod);
  }

  // @Put('/:paymentMethodId')
  // @ApiOperation({ summary: 'Atualiza dados de um PaymentMethod' })
  // @ApiResponse({ type: PaymentMethodPresenter })
  // @ApiException(() => [PaymentMethodNotFoundException])
  // async updateOnePaymentMethod(
  //   @Param('paymentMethodId') paymentMethodId: string,
  //   @Body() dataPaymentMethod: PaymentMethodUpdateDTO,
  // ): Promise<PaymentMethodPresenter> {
  //   return this.paymentMethodHandle.updateOnePaymentMethod(
  //     paymentMethodId,
  //     dataPaymentMethod,
  //   );
  // }

  // @Get()
  // @ApiOperation({ summary: 'Lista de todos os PaymentMethods' })
  // @ApiResponse({ type: FindAllPresent.forEntity(PaymentMethodPresenter) })
  // async getAllPaymentMethod(
  //   @Query() queries: PaymentMethodFindAllDTO,
  // ): Promise<FindAllPresent<PaymentMethodPresenter>> {
  //   return this.paymentMethodHandle.findAllPaymentMethod(queries);
  // }

  // @Get('/:paymentMethodId')
  // @ApiOperation({ summary: 'Obtém dados de um PaymentMethod' })
  // @ApiResponse({ type: PaymentMethodPresenter })
  // @ApiException(() => [PaymentMethodNotFoundException])
  // async getOnePaymentMethodById(
  //   @Param('paymentMethodId') paymentMethodId: string,
  // ): Promise<PaymentMethodPresenter> {
  //   return this.paymentMethodHandle.findOnePaymentMethodById(paymentMethodId);
  // }
}
