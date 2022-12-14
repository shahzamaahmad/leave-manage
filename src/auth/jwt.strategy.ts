/* eslint-disable prettier/prettier */
import { jwtConstants } from './jwt.constant';
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: 'secretkey'
    });
  }
  async validate(payload: any) {
    return { username: payload.username, empID: payload.empID };
  }
}
