export interface IJwtPayload {
  id: number;
  email: string;
  role: string;
  iat: number;
  notVerified?: boolean;
}
