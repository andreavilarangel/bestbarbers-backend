import { UserPresenter } from 'src/app/presenter/User.presenter';

export type UserPresenterResponse = Omit<UserPresenter, 'password'>;
