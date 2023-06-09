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
  BlockedTimeCreateDTO,
  BlockedTimeUpdateDTO,
  BlockedTimeFindAllDTO,
} from 'src/app/modules/BlockedTime/BlockedTime.dto';
import { BlockedTimePresenter } from 'src/app/modules/BlockedTime/BlockedTime.presenter';
import { BlockedTimeHandle } from 'src/app/handles/BlockedTime/BlockedTime.handle';
import { FindAllPresent } from 'src/shared/FindAll.presenter';
import { BlockedTimeNotFoundException } from 'src/app/modules/BlockedTime/BlockedTime.error';
import { Public } from 'src/app/decorators/public';

@Injectable()
@ApiTags('Horários bloqueados (BlockedTime)')
@Controller('blocked-time')
@Public()
export class BlockedTimeController {
  constructor(private readonly blockedTimeHandle: BlockedTimeHandle) {}

  @Post()
  @ApiOperation({ summary: 'Criar um novo bloqueio de horário' })
  @ApiResponse({ type: BlockedTimePresenter })
  @ApiException(() => [])
  async createOneBlockedTime(
    @Body() newBlockedTime: BlockedTimeCreateDTO,
  ): Promise<BlockedTimePresenter> {
    return this.blockedTimeHandle.createOneBlockedTime(newBlockedTime);
  }

  @Get('/:barbershop_id')
  @ApiOperation({
    summary: 'Lista de todos os horários bloqueados de uma barbearia',
  })
  @ApiResponse({ type: FindAllPresent.forEntity(BlockedTimePresenter) })
  async getAllBlockedTime(
    @Param('barbershop_id') barbershop_id: string,
  ): Promise<FindAllPresent<BlockedTimePresenter>> {
    return this.blockedTimeHandle.findAllBlockedTime(barbershop_id);
  }

  @Delete('/delete/:blocked_time_id')
  @ApiOperation({ summary: 'Exclui um produto ou serviço' })
  @ApiResponse({ type: BlockedTimePresenter })
  @ApiException(() => [BlockedTimeNotFoundException])
  async deleteOneProductAndService(
    @Param('blocked_time_id') blocked_time_id: string,
  ): Promise<BlockedTimePresenter> {
    return this.blockedTimeHandle.deleteOneProductAndService(blocked_time_id);
  }
}
