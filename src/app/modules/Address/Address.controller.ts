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
import { AddressPresenter } from 'src/app/presenter/Address.presenter';
import { AddressHandle } from 'src/app/handles/Address/Address.handle';
import { FindAllPresent } from 'src/app/presenter/FindAll.presenter';
import { AddressControllerInterface } from './AddressController.interface';
import { AddressNotFoundException } from 'src/app/errors/Address.error';
import { Public } from 'src/app/decorators/public';

@Injectable()
@ApiTags('Address')
@Controller('address')
@Public()
export class AddressController implements AddressControllerInterface {
  constructor(private readonly addressHandle: AddressHandle) {}

  @Post()
  @ApiOperation({ summary: 'Cria um Address' })
  @ApiResponse({ type: AddressPresenter })
  @ApiException(() => [])
  async createOneAddress(
    @Body() newAddress: AddressCreateDTO,
  ): Promise<AddressPresenter> {
    return this.addressHandle.createOneAddress(newAddress);
  }

  @Put('/:addressId')
  @ApiOperation({ summary: 'Atualiza dados de um Address' })
  @ApiResponse({ type: AddressPresenter })
  @ApiException(() => [AddressNotFoundException])
  async updateOneAddress(
    @Param('addressId') addressId: string,
    @Body() dataAddress: AddressUpdateDTO,
  ): Promise<AddressPresenter> {
    return this.addressHandle.updateOneAddress(addressId, dataAddress);
  }

  @Get()
  @ApiOperation({ summary: 'Lista de todos os Addresss' })
  @ApiResponse({ type: FindAllPresent.forEntity(AddressPresenter) })
  async getAllAddress(
    @Query() queries: AddressFindAllDTO,
  ): Promise<FindAllPresent<AddressPresenter>> {
    return this.addressHandle.findAllAddress(queries);
  }

  @Get('/:addressId')
  @ApiOperation({ summary: 'Obtém dados de um Address' })
  @ApiResponse({ type: AddressPresenter })
  @ApiException(() => [AddressNotFoundException])
  async getOneAddressById(
    @Param('addressId') addressId: string,
  ): Promise<AddressPresenter> {
    return this.addressHandle.findOneAddressById(addressId);
  }
}