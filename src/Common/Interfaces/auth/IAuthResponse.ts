import { User } from '../../../Services/user/entities/user.entity';

export interface IAuthResponse {
  authorized: boolean;
  accountStatus?: string;
  access_token: string;
  refresh_token: string;
  user?: User;
}
