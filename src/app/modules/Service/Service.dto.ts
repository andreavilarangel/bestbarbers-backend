import { OmitType, PartialType } from '@nestjs/swagger';
import { PaginationDTO } from 'src/shared/Pagination.dto';
import { ServiceEntity } from 'src/app/modules/Service/Service.entity';

export class ServiceCreateDTO extends OmitType(ServiceEntity, [
  'id',
  'created_at',
  'updated_at',
]) {}
export class ServiceUpdateDTO extends PartialType(ServiceCreateDTO) {}
export class ServiceFindAllDTO extends PaginationDTO {}
