import { IsNotEmpty } from 'class-validator';

export class LoginUserInput {
  @IsNotEmpty()
  login: string;
  @IsNotEmpty()
  password: string;
}
