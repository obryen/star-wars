import { HttpModule, Module } from '@nestjs/common';
import { PeopleResolver } from './people.resolver';
import { StarWarsController } from './star-wars.controller';
import { StarWarsService } from './star-wars.service';

@Module({
  imports: [HttpModule],
  controllers: [StarWarsController],
  providers: [StarWarsService, PeopleResolver],
})
export class StarWarsModule {}
