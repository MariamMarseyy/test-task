import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy, VerifiedCallback } from 'passport-jwt';
import { AuthService } from '../auth.service';
import { User } from '../../user/entities/user.entity';
import { jwtConstants } from '../../../Common/Constants/jwt.constants';
import { IJwtPayload } from '../../../Common/Interfaces/auth/IJwtPayload';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      passReqToCallback: true,
      ignoreExpiration: false,
      secretOrKey: jwtConstants.secret,
    });
  }

  async validate(payload: IJwtPayload) {
    return {
      id: payload.id,
      email: payload.email,
      role: payload.role,
    };
  }
}
