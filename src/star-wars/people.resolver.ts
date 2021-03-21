import { Args, Query, Resolver } from '@nestjs/graphql';
import { PeopleModel } from './models/people';
import { StarWarsService } from './star-wars.service';

@Resolver(() => PeopleModel)
export class PeopleResolver {
  constructor(private readonly starWarsService: StarWarsService) {}

  @Query(() => [PeopleModel], { name: 'people', nullable: true })
  async getPeople(
    @Args('page_num') pageNumber: number,
  ): Promise<PeopleModel[]> {
    return await this.starWarsService.fetchAllPeople(pageNumber);
  }

  @Query(() => [PeopleModel], { name: 'person', nullable: true })
  async getPerson(@Args('name') name: string): Promise<PeopleModel[]> {
    const person = await this.starWarsService.fetchOnePerson(name);
    return person;
  }
}
