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
  AddressCreateDTO,
  AddressUpdateDTO,
  AddressFindAllDTO,
} from 'src/app/dtos/Address.dto';
import { AddressPresenter } from 'src/app/modules/Address/Address.presenter';
import { AddressHandle } from 'src/app/handles/Address/Address.handle';
import { FindAllPresent } from 'src/shared/FindAll.presenter';
import { AddressNotFoundException } from 'src/app/errors/Address.error';
import { Public } from 'src/app/decorators/public';

@Injectable()
@ApiTags('Address')
@Controller('address')
@Public()
export class AddressController {
  constructor(private readonly addressHandle: AddressHandle) {}

  // @Post()
  // @ApiOperation({ summary: 'Cria um Address' })
  // @ApiResponse({ type: AddressPresenter })
  // @ApiException(() => [])
  // async createOneAddress(
  //   @Body() newAddress: AddressCreateDTO,
  // ): Promise<AddressPresenter> {
  //   return this.addressHandle.createOneAddress(newAddress);
  // }

  @Post('barbershop')
  @ApiOperation({ summary: 'Cria ou atualiza o endereço de uma barbearia' })
  @ApiResponse({ type: AddressPresenter })
  @ApiException(() => [])
  async barbershopAddress(
    @Body() dataAddress: AddressCreateDTO,
  ): Promise<AddressPresenter> {
    return this.addressHandle.barbershopAddress(dataAddress);
  }

  // @Put('/:addressId')
  // @ApiOperation({ summary: 'Atualiza dados de um Address' })
  // @ApiResponse({ type: AddressPresenter })
  // @ApiException(() => [AddressNotFoundException])
  // async updateOneAddress(
  //   @Param('addressId') addressId: string,
  //   @Body() dataAddress: AddressUpdateDTO,
  // ): Promise<AddressPresenter> {
  //   return this.addressHandle.updateOneAddress(addressId, dataAddress);
  // }

  // @Get()
  // @ApiOperation({ summary: 'Lista de todos os Addresss' })
  // @ApiResponse({ type: FindAllPresent.forEntity(AddressPresenter) })
  // async getAllAddress(
  //   @Query() queries: AddressFindAllDTO,
  // ): Promise<FindAllPresent<AddressPresenter>> {
  //   return this.addressHandle.findAllAddress(queries);
  // }

  // @Get('/:addressId')
  // @ApiOperation({ summary: 'Obtém dados de um Address' })
  // @ApiResponse({ type: AddressPresenter })
  // @ApiException(() => [AddressNotFoundException])
  // async getOneAddressById(
  //   @Param('addressId') addressId: string,
  // ): Promise<AddressPresenter> {
  //   return this.addressHandle.findOneAddressById(addressId);
  // }

  // @Get('/barbershop/:barbershopId')
  // @ApiOperation({ summary: 'Obtém dados de um Address pelo barbershop_id' })
  // @ApiResponse({ type: AddressPresenter })
  // @ApiException(() => [AddressNotFoundException])
  // async getOneAddressByBarbershopId(
  //   @Param('barbershopId') barbershop_id: string,
  // ): Promise<AddressPresenter> {
  //   return this.addressHandle.findOneAddressByBarbershopId(barbershop_id);
  // }
}
