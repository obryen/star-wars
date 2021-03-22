import { HttpService, Injectable, Logger } from '@nestjs/common';
import * as Util from 'util';
import { PeopleModel } from '../models/people';
import { swapi } from 'src/common/enviroment-vars';
import {
  ResDataInterface,
  ResponseInterface,
} from 'src/common/response-interface';
import { HomeWorldModel } from '../models/homeworld';
import { RedisService } from 'src/common/configs/redis.service';

@Injectable()
export class StarWarsService {
  constructor(
    private readonly httpService: HttpService,
    private readonly redisService: RedisService,
  ) {}

  peopleURL = `${swapi.main}/people`;
  planetUrl = `${swapi.main}/planets`;
  async makeGetRequest(url: any) {
    const response = await this.httpService.get(url).toPromise();

    return response.data ? response.data : null;
  }

  async refreshPlanetInCache(url: string): Promise<HomeWorldModel> {
    const planet: HomeWorldModel = await this.makeGetRequest(url);

    await this.redisService.createOrUpdateList(url, 500, planet);

    // return result
    return planet;
  }

  async fetchPlanetByUrl(url: any): Promise<HomeWorldModel> {
    let planet: HomeWorldModel;
    planet = await this.redisService.get(url);
    // ensure planets exist
    if (!planet) {
      return await this.refreshPlanetInCache(url);
    }

    return planet;

    // fetch planet from redis
  }

  async fetchAllPeople(page?: number): Promise<PeopleModel[]> {
    try {
      const response: ResponseInterface = await this.httpService
        .get(`${this.peopleURL}/?page=${page}`)
        .toPromise();

      if (response.data && response.data.results.length) {
        const resolvedPeopleWithHomes = await Promise.all(
          response.data.results.map(async (person) => {
            if (person.homeworld) {
              const fetchedHomeWorld = await this.fetchPlanetByUrl(
                person.homeworld,
              );
              person.homeworld = fetchedHomeWorld;

              return person;
            }
          }),
        );

        return resolvedPeopleWithHomes;
      }

      return [];
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

  async authenticateUser(userName:string){
    // check if user is in session, return  token
       // if user is not in session cache, sign new token , add to session,
  }
}
