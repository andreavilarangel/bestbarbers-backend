import { OmitType, PartialType } from '@nestjs/swagger';
import { PaginationDTO } from 'src/shared/Pagination.dto';
import { EmployerProductAndServiceEntity } from 'src/app/modules/EmployerProductAndService/EmployerProductAndService.entity';

export class EmployerProductAndServiceCreateDTO extends OmitType(
  EmployerProductAndServiceEntity,
  ['id', 'created_at', 'updated_at'],
) {}
export class EmployerProductAndServiceUpdateDTO extends PartialType(
  EmployerProductAndServiceCreateDTO,
) {}
export class EmployerProductAndServiceFindAllDTO extends PaginationDTO {}
