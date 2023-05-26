import { UserPresenter } from 'src/app/modules/User/User.presenter';

export type UserPresenterResponse = Omit<UserPresenter, 'password'>;
