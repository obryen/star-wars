import { Injectable, UnauthorizedException } from '@nestjs/common';
import { RedisService } from 'src/common/configs/redis.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthenticationService {
  constructor(
    private readonly redisService: RedisService,
    private readonly jwtService: JwtService,
  ) {}

  async authenticateUser(userName: string) {
    const token = await this.redisService.get(userName);

    // if user is not in session cache, sign new token , add to session,
    if (!userName) {
      const token = this.jwtService.sign(userName);
      await this.redisService.set(userName, token);
      return token;
    }

    return token;
  }

  async checkForValidToken(token: string) {
    const user = await this.redisService.get(token);

    if (!user) {
      throw new UnauthorizedException('Invalid token or session has expired');
    }

    return user;
  }
}
