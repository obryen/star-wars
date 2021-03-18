import { HttpService, Injectable } from '@nestjs/common';
import { PeopleModel } from './models/people';

@Injectable()
export class StarWarsService {
  constructor(private readonly httpService: HttpService) {}
  mainUrl = `Https://swapi.dev/api`;
  peopleURL = `${this.mainUrl}/people`;

  async fetchAllPeople(page?: number): Promise<PeopleModel[]> {
    const response = await this.httpService
      .get(`${this.peopleURL}?page=${page}`)
      .toPromise();

    return response.data;
  }

  async fetchOnePerson(name: string): Promise<PeopleModel> {
    const response = await this.httpService
      .get(`${this.peopleURL}?search=${name}`)
      .toPromise();

    return response.data;
  }
}
