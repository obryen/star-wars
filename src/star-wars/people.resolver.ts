import { Args, Query, Resolver } from '@nestjs/graphql';
import { PeopleModel } from './models/people';
import { StarWarsService } from './star-wars.service';

@Resolver(() => PeopleModel)
export class PeopleResolver {
  constructor(
    private readonly starWarsService: StarWarsService,
  ) {}

  @Query(() => [PeopleModel], { name: 'people', nullable: true })
  getPeople(@Args('user') user:string): Promise<PeopleModel[]> {
    return this.starWarsService.fetchAllPeople();
  }
}
