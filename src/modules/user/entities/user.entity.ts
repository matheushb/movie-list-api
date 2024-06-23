import { Genre, Language } from '@/modules/movie/entities/movie.entity';
import { UserList } from '@prisma/client';

export class User {
  id: string;
  email: string;
  name?: string;
  password: string;
  favoriteGenres?: Genre[];
  favoriteLanguages?: Language[];
  bio?: string;
  birthDate: Date;
  createdAt: Date;
  updatedAt: Date;
  UserList?: UserList[];
}
