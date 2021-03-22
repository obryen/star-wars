import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
export class TokenModel {
  @Field({ nullable: true })
  name: string;
  @Field()
  token: string;
}
