import { PeopleModel } from 'src/star-wars/models/people';

export interface ResDataInterface {
  count: number;
  next?: string;
  previous?: string;
  results: PeopleModel[];
}

export interface ResponseInterface {
  data: ResDataInterface;
}
