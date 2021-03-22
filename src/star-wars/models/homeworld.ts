import { ObjectType, Field } from '@nestjs/graphql';
import { FilmsModel as Film } from './films';

@ObjectType()
export class HomeWorldModel {
  @Field({ nullable: true })
  name: string;
  @Field({ nullable: true })
  rotation_period: string;
  @Field({ nullable: true })
  orbital_period: string;
  @Field({ nullable: true })
  diameter: string;
  @Field({ nullable: true })
  climate: string;
  @Field({ nullable: true })
  gravity: string;
  @Field({ nullable: true })
  terrain: string;
  @Field({ nullable: true })
  surface_water: string;
  @Field({ nullable: true })
  population: string;
  // @Field()
  // residents: string[];
  @Field((type) => [Film], { nullable: true })
  films: Film[];
  @Field({ nullable: true })
  created: Date;
  @Field({ nullable: true })
  edited: Date;
  @Field({ nullable: true })
  url: string;
}
