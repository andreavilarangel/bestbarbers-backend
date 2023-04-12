import { AuthSignInDTO } from 'src/app/dtos/Auth.dto';
import { AuthPresenter } from 'src/app/presenter/Auth.presenter';

export interface AuthControllerInterface {
  signIn(body: AuthSignInDTO): Promise<AuthPresenter>;
  resetPassword(body: {
    username: string;
    newPassword: string;
    code: string;
  }): Promise<void>;
}