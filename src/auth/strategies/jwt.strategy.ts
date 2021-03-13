import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
// import { jwtConstants } from './constants';
import { ConfigService } from '@nestjs/config';
import { AuthRepository } from '../auth.repository';
import { IJwtPayload } from '../interfaces/jwt-payload.interface';
import { UserEntity } from '../../users/user.entity';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private configService: ConfigService,
    private authRepository: AuthRepository,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get('configuration.jwt.secret'),
    });
  }

  async validate(payload: IJwtPayload): Promise<IJwtPayload> {
    const { username } = payload;

    const user: UserEntity = await this.authRepository.findOne({
      where: { username, status: 'ACTIVE' },
    });

    if (!user) {
      throw new UnauthorizedException();
    }

    return payload;
  }
}
