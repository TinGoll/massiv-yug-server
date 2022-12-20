import { IsInt, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class UserAccountCreateInput {
  @IsString()
  login: string;
  @IsNotEmpty()
  password: string;
}

export class UserAccountUpdateInput {
  @IsInt()
  id: number;

  @IsOptional()
  login?: string;
  @IsOptional()
  password?: string;
}
