import { IsEmail, IsNotEmpty } from 'class-validator';

export class EmailCreateInput {
  @IsEmail()
  email: string;
}

export class EmailUpdateInput {
  @IsNotEmpty()
  id: number;
  @IsEmail()
  email?: string;
}
