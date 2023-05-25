import { AuthSignInDTO } from 'src/app/dtos/Auth.dto';
import { AuthPresenter } from 'src/app/modules/Auth/Auth.presenter';

export interface AuthControllerInterface {
  signIn(body: AuthSignInDTO): Promise<AuthPresenter>;
}
