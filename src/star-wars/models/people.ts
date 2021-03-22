import { ObjectType, Field } from '@nestjs/graphql';
import { FilmsModel } from './films';
import { HomeWorldModel } from './homeworld';

@ObjectType()
export class PeopleModel {
  constructor(intialData: Partial<PeopleModel> = null) {
    if (intialData !== null) {
      Object.assign(this, intialData);
    }
  }
  @Field({ nullable: true })
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
  @Field((type) => FilmsModel, { nullable: true })
  films: FilmsModel[];
  // @Field()
  // species: any[];
  // @Field()
  // vehicles: string[];
  // @Field()
  // starships: string[];
  @Field()
  created: Date;
  @Field()
  edited: Date;
  @Field()
  url: string;
}
