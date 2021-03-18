import { HttpService, Injectable, Logger } from '@nestjs/common';
import * as Util from 'util';
import { PeopleModel } from './models/people';
import { swapi } from 'src/common/API';

@Injectable()
export class StarWarsService {
  constructor(private readonly httpService: HttpService) {}

  peopleURL = `${swapi.main}/people`;

  async fetchAllPeople(page?: number): Promise<PeopleModel[]> {
    try {
      const response = await this.httpService
        .get(`${this.peopleURL}`)
        .toPromise();

      return response.data.results;
    } catch (error) {
      Logger.error(
        `Something went wrong while making network request, possible issue: `,
        Util.inspect(error),
      );
      return null;
    }
  }

  async fetchOnePerson(name: string): Promise<PeopleModel> {
    const response = await this.httpService
      .get(`${this.peopleURL}/?search=${name}`)
      .toPromise();

    return response.data.results;
  }
}
