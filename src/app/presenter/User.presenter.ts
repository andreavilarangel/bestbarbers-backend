import { OmitType } from '@nestjs/swagger';
import { UserEntity } from 'src/core/entities/User.entity';

export class UserPresenter extends OmitType(UserEntity, ['password']) {}

export class UserPresenterWithPassword extends UserEntity {}
