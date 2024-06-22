import { UserList } from '@prisma/client';
import { Genre, Language } from 'src/modules/movie/entities/movie.entity';

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
