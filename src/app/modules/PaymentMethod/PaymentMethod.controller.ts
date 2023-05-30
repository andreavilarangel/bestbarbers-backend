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
  PaymentMethodCreateDTO,
  PaymentMethodUpdateDTO,
} from 'src/app/modules/PaymentMethod/PaymentMethod.dto';
import { PaymentMethodPresenter } from 'src/app/modules/PaymentMethod/PaymentMethod.presenter';
import { PaymentMethodHandle } from 'src/app/handles/PaymentMethod/PaymentMethod.handle';
import { FindAllPresent } from 'src/shared/FindAll.presenter';

import { PaymentMethodNotFoundException } from 'src/app/handles/PaymentMethod/PaymentMethod.error';
import { Public } from 'src/app/decorators/public';

@Injectable()
@ApiTags('Métodos de pagamento (PaymentMethod)')
@Controller('payment-method')
@Public()
export class PaymentMethodController {
  constructor(private readonly paymentMethodHandle: PaymentMethodHandle) {}

  @Post()
  @ApiOperation({ summary: 'Cria um método de pagamento' })
  @ApiResponse({ type: PaymentMethodPresenter })
  @ApiException(() => [])
  async createOnePaymentMethod(
    @Body() newPaymentMethod: PaymentMethodCreateDTO,
  ): Promise<PaymentMethodPresenter> {
    return this.paymentMethodHandle.createOnePaymentMethod(newPaymentMethod);
  }

  @Get('/:barbershop_id')
  @ApiOperation({
    summary: 'Lista de todos os métodos de pagamento de uma barbearia',
  })
  @ApiResponse({ type: FindAllPresent.forEntity(PaymentMethodPresenter) })
  async getAllPaymentMethod(
    @Param('barbershop_id') barbershop_id: string,
  ): Promise<FindAllPresent<PaymentMethodPresenter>> {
    return this.paymentMethodHandle.findBarbershopPaymentMethods(barbershop_id);
  }

  @Put('/:payment_method_id')
  @ApiOperation({ summary: 'Atualiza dados de um método de pagamento' })
  @ApiResponse({ type: PaymentMethodPresenter })
  @ApiException(() => [PaymentMethodNotFoundException])
  async updateOnePaymentMethod(
    @Param('payment_method_id') payment_method_id: string,
    @Body() dataPaymentMethod: PaymentMethodUpdateDTO,
  ): Promise<PaymentMethodPresenter> {
    return this.paymentMethodHandle.updateOnePaymentMethod(
      payment_method_id,
      dataPaymentMethod,
    );
  }

  @Delete('/:payment_method_id')
  @ApiOperation({ summary: 'Exclui um método de pagamento' })
  @ApiResponse({ type: PaymentMethodPresenter })
  @ApiException(() => [PaymentMethodNotFoundException])
  async deleteOnePaymentMethod(
    @Param('payment_method_id') payment_method_id: string,
  ): Promise<PaymentMethodPresenter> {
    return this.paymentMethodHandle.deleteOnePaymentMethod(payment_method_id);
  }
}
