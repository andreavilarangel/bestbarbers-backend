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
  BlockedTimeCreateDTO,
  BlockedTimeUpdateDTO,
  BlockedTimeFindAllDTO,
} from 'src/app/modules/BlockedTime/BlockedTime.dto';
import { BlockedTimePresenter } from 'src/app/modules/BlockedTime/BlockedTime.presenter';
import { BlockedTimeHandle } from 'src/app/handles/BlockedTime/BlockedTime.handle';
import { FindAllPresent } from 'src/shared/FindAll.presenter';
import { BlockedTimeNotFoundException } from 'src/app/handles/BlockedTime/BlockedTime.error';
import { Public } from 'src/app/decorators/public';

@Injectable()
@ApiTags('Horários bloqueados (BlockedTime)')
@Controller('blockedTime')
@Public()
export class BlockedTimeController {
  constructor(private readonly blockedTimeHandle: BlockedTimeHandle) {}

  // @Post()
  // @ApiOperation({ summary: 'Cria um BlockedTime' })
  // @ApiResponse({ type: BlockedTimePresenter })
  // @ApiException(() => [])
  // async createOneBlockedTime(
  //   @Body() newBlockedTime: BlockedTimeCreateDTO,
  // ): Promise<BlockedTimePresenter> {
  //   return this.blockedTimeHandle.createOneBlockedTime(newBlockedTime);
  // }

  // @Put('/:blockedTimeId')
  // @ApiOperation({ summary: 'Atualiza dados de um BlockedTime' })
  // @ApiResponse({ type: BlockedTimePresenter })
  // @ApiException(() => [BlockedTimeNotFoundException])
  // async updateOneBlockedTime(
  //   @Param('blockedTimeId') blockedTimeId: string,
  //   @Body() dataBlockedTime: BlockedTimeUpdateDTO,
  // ): Promise<BlockedTimePresenter> {
  //   return this.blockedTimeHandle.updateOneBlockedTime(
  //     blockedTimeId,
  //     dataBlockedTime,
  //   );
  // }

  // @Get()
  // @ApiOperation({ summary: 'Lista de todos os BlockedTimes' })
  // @ApiResponse({ type: FindAllPresent.forEntity(BlockedTimePresenter) })
  // async getAllBlockedTime(
  //   @Query() queries: BlockedTimeFindAllDTO,
  // ): Promise<FindAllPresent<BlockedTimePresenter>> {
  //   return this.blockedTimeHandle.findAllBlockedTime(queries);
  // }

  // @Get('/:blockedTimeId')
  // @ApiOperation({ summary: 'Obtém dados de um BlockedTime' })
  // @ApiResponse({ type: BlockedTimePresenter })
  // @ApiException(() => [BlockedTimeNotFoundException])
  // async getOneBlockedTimeById(
  //   @Param('blockedTimeId') blockedTimeId: string,
  // ): Promise<BlockedTimePresenter> {
  //   return this.blockedTimeHandle.findOneBlockedTimeById(blockedTimeId);
  // }
}
