import { ObjectType, Field } from '@nestjs/graphql';
import { FilmsModel as Film } from './films';

@ObjectType()
export class HomeWorldModel {
  @Field()
  name: string;
  @Field()
  rotation_period: string;
  @Field()
  orbital_period: string;
  @Field()
  diameter: string;
  @Field()
  climate: string;
  @Field()
  gravity: string;
  @Field()
  terrain: string;
  @Field()
  surface_water: string;
  @Field()
  population: string;
  // @Field()
  // residents: string[];
  @Field((type) => [Film], { nullable: true })
  films: Film[];
  @Field()
  created: Date;
  @Field()
  edited: Date;
  @Field()
  url: string;
}
