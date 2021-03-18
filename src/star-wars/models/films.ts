import { Field } from '@nestjs/graphql';

export class FilmsModel {
  @Field()
  title: string;
  @Field()
  episode_id: number;
  @Field()
  opening_crawl: string;
  @Field()
  director: string;
  @Field()
  producer: string;
  @Field()
  release_date: string;
  @Field()
  characters: string[];
  @Field()
  planets: string[];
  @Field()
  starships: string[];
  @Field()
  vehicles: string[];
  @Field()
  species: string[];
  @Field()
  created: Date;
  @Field()
  edited: Date;
  @Field()
  url: string;
}
