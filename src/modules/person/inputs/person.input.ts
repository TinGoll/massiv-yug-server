import { IsInt, IsNotEmpty, IsOptional, IsString } from 'class-validator';

/** Набор полей необходимых для добавления человка */
export class PersonCreateInput {
  /** Имя */
  @IsString()
  firstName: string;
  /** Фамилия */
  @IsOptional()
  lastName?: string;
  /** Отчество */
  @IsOptional()
  middleName?: string;

  @IsString()
  login: string;

  @IsNotEmpty()
  password: string;

  gender: 'Male' | 'Female';
}
/** Набор полей необходимых для обновления человка */
export class PersonUpdateInput {
  /** id человека */
  @IsInt()
  id: number;
  /** Имя */
  @IsOptional()
  firstName?: string;
  /** Фамилия */
  @IsOptional()
  lastName?: string;
  /** Отчество */
  @IsOptional()
  middleName?: string;

  gender: 'Male' | 'Female';
}
