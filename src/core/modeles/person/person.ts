type Role = "USER" | "ADMIN";

export class Person {
  id: number;
  firstName: string;
  lastName: string;
  middleName: string;
  nickName: string;
  roles: Role[] = [];
}
