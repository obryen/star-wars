import { HttpModule, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '../common/configs/config.module';
import { jwtCredentials } from '../../src/common/enviroment-vars';
import { AuthenticationService } from './services/authentication.service';
import { PeopleResolver } from './resolvers/people.resolver';
import { StarWarsController } from './star-wars.controller';
import { StarWarsService } from './services/star-wars.service';

@Module({
  imports: [
    HttpModule,
    ConfigModule,
    JwtModule.register({
      secret: jwtCredentials.hashingSecret,
      signOptions: { expiresIn: Number(jwtCredentials.jwtTtl) },
    }),
  ],
  controllers: [StarWarsController],
  providers: [StarWarsService, PeopleResolver, AuthenticationService],
})
export class StarWarsModule {}
