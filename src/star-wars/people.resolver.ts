import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { AuthenticationService } from './authentication.service';
import { PeopleModel } from './models/people';
import { StarWarsService } from './star-wars.service';

@Resolver(() => PeopleModel)
export class PeopleResolver {
  constructor(
    private readonly starWarsService: StarWarsService,
    private readonly authService: AuthenticationService,
  ) {}

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

  @Mutation(() => String, { name: 'getToken' })
  async getToken(@Args('user') user: string) {
    const token = await this.authService.authenticateUser(user);
    return token;
  }
}
