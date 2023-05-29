import { OmitType } from '@nestjs/swagger';
import { UserEntity } from 'src/app/modules/User/User.entity';

export class UserPresenter extends OmitType(UserEntity, ['password']) {}

export class UserPresenterWithPassword extends UserEntity {}

export type UserPresenterResponse = Omit<UserPresenter, 'password'>;
