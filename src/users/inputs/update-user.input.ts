import { Field, ID, InputType } from "@nestjs/graphql";

@InputType()
export class UpdateUserInput {
    @Field(() => ID)
    id: number;

  @Field({ nullable: true })
  userName: string;
  @Field({ nullable: true })
  name: string;
  @Field({ nullable: true })
  lastName: string;
}