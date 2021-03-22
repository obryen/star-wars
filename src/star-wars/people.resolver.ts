import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Token } from 'graphql';
import { AuthenticationService } from './authentication.service';
import { PeopleModel } from './models/people';
import { TokenModel } from './models/token';
import { StarWarsService } from './star-wars.service';

@Resolver(() => PeopleModel)
export class PeopleResolver {
  constructor(
    private readonly starWarsService: StarWarsService,
    private readonly authService: AuthenticationService,
  ) {}

  @Query(() => [PeopleModel], { name: 'people', nullable: true })
  async getPeople(
    @Args('token') token: string,
    @Args('page_num') pageNumber?: number,
  ): Promise<PeopleModel[]> {
    await this.authService.checkForValidToken(token);
    return await this.starWarsService.fetchAllPeople(pageNumber);
  }

  @Query(() => [PeopleModel], { name: 'person', nullable: true })
  async getPerson(
    @Args('token') token: string,
    @Args('name') name: string,
  ): Promise<PeopleModel[]> {
    await this.authService.checkForValidToken(token);
    const person = await this.starWarsService.fetchOnePerson(name);
    return person;
  }

  @Mutation(() => TokenModel, { name: 'getToken' })
  async getToken(@Args('user') user: string): Promise<TokenModel> {
    const token = await this.authService.authenticateUser(user);
    return token;
  }
}
