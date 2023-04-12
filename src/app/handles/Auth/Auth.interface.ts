import { AuthPresenter } from 'src/app/presenter/Auth.presenter'

export interface AuthHandleInterface {
  signIn(username: string, password: string): Promise<AuthPresenter>
}
