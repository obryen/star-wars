import { Injectable, UnauthorizedException } from '@nestjs/common';
import { RedisService } from 'src/common/configs/redis.service';
import { JwtService } from '@nestjs/jwt';
import { TokenModel } from './models/token';

@Injectable()
export class AuthenticationService {
  constructor(
    private readonly redisService: RedisService,
    private readonly jwtService: JwtService,
  ) {}

  async authenticateUser(userName: string): Promise<TokenModel> {
    const token = await this.redisService.get(userName);

    // if user is not in session cache, sign new token , add to session,
    if (!token) {
      const tosign = {
        name: userName,
      };
      const newToken = this.jwtService.sign(tosign);
      await this.redisService.set(userName, newToken);
      return { name: userName, token };
    }

    return { name: userName, token };
  }

  async checkForValidToken(token: string) {
    const user = await this.redisService.get(token);

    if (!user) {
      throw new UnauthorizedException('Invalid token or session has expired');
    }

    return user;
  }
}
