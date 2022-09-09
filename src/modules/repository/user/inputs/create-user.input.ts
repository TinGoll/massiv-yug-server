import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateUserInput {

  @Field({ nullable: false })
  userName: string;

  @Field({ nullable: false })
  name: string;
  
  @Field({ nullable: true })
  lastName: string;
}
