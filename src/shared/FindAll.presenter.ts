import { ApiProperty } from '@nestjs/swagger';
import { Type as TypeTransform } from 'class-transformer';
import { IsNumber } from 'class-validator';

// eslint-disable-next-line @typescript-eslint/ban-types
type Entity = Function;

export class FindAllPresent<EntityClass> {
  @TypeTransform(() => Object)
  @ApiProperty({ type: [Object] })
  data: EntityClass[];

  @IsNumber()
  @ApiProperty({ example: 386 })
  total: number;

  static forEntity(type: Entity): typeof FindAllPresent {
    class FindAllPresentForEntity<Entity> extends FindAllPresent<Entity> {
      @ApiProperty({ type, isArray: true })
      public data: Entity[];
    }

    Object.defineProperty(FindAllPresentForEntity, 'name', {
      value: `FindAllPresentFor${type.name}`,
    });

    return FindAllPresentForEntity;
  }
}
