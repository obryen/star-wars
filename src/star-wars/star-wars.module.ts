import { HttpModule, Module } from '@nestjs/common';
import { StarWarsController } from './star-wars.controller';
import { StarWarsService } from './star-wars.service';

@Module({
  imports: [HttpModule],
  controllers: [StarWarsController],
  providers: [StarWarsService],
})
export class StarWarsModule {}
