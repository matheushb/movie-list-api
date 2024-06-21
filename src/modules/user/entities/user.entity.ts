import { UserList } from '@prisma/client';

export class User {
  id: string;
  email: string;
  name?: string;
  password: string;
  bio?: string;
  birthDate: Date;
  createdAt: Date;
  updatedAt: Date;
  UserList?: UserList[];
}
