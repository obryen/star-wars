import { HttpService, Injectable, Logger } from '@nestjs/common';
import * as Util from 'util';
import { PeopleModel } from './models/people';
import { swapi } from 'src/common/enviroment-vars';
import {
  ResDataInterface,
  ResponseInterface,
} from 'src/common/response-interface';

@Injectable()
export class StarWarsService {
  constructor(private readonly httpService: HttpService) {}

  peopleURL = `${swapi.main}/people`;

  async fetchAllPeople(page?: number): Promise<PeopleModel[]> {
    try {
      const response: ResponseInterface = await this.httpService
        .get(`${this.peopleURL}/?page=${page}`)
        .toPromise();

      return response.data ? response.data.results : [];
    } catch (error) {
      Logger.error(
        `Something went wrong while making network request, possible issue: `,
        Util.inspect(error),
      );
      return null;
    }
  }

  async fetchOnePerson(name: string): Promise<PeopleModel[]> {
    try {
      const response: ResponseInterface = await this.httpService
        .get(`${this.peopleURL}/?search=${name}`)
        .toPromise();
      response.data;

      return response.data ? response.data.results : [];
    } catch (error) {
      Logger.error(
        `Something went wrong while making network request, possible issue: `,
        Util.inspect(error),
      );
    }
  }
}
