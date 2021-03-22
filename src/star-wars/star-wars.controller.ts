import { Controller, Get, Param } from '@nestjs/common';
import { PeopleModel } from './models/people';
import { StarWarsService } from './star-wars.service';

@Controller('people')
export class StarWarsController {
  constructor(private readonly starwarsService: StarWarsService) {}

  @Get(':page/route')
  async getAllPeeps(@Param('page') page: number): Promise<PeopleModel[]> {
    return await this.starwarsService.fetchAllPeople(page);
  }

  @Get(':id/person')
  async getOnePerson(
    @Param('page') page: number,
    @Param('id') name: string,
  ): Promise<PeopleModel[]> {
    return await this.starwarsService.fetchOnePerson(name);
  }
}
