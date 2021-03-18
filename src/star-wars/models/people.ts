import { ObjectType, Field } from '@nestjs/graphql';
import { HomeWorldModel } from './homeworld';

export class PeopleModel {
  @Field()
  name: string;
  @Field()
  height: string;
  @Field()
  mass: string;
  @Field()
  hair_color: string;
  @Field()
  skin_color: string;
  @Field()
  eye_color: string;
  @Field()
  birth_year: string;
  @Field()
  gender: string;
  @Field((type) => HomeWorldModel, { nullable: true })
  homeworld: HomeWorldModel;
  @Field()
  films: string[];
  @Field()
  species: any[];
  @Field()
  vehicles: string[];
  @Field()
  starships: string[];
  @Field()
  created: Date;
  @Field()
  edited: Date;
  @Field()
  url: string;
}
