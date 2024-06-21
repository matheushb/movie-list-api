import { MovieList, UserList } from '@prisma/client';

export class List {
  id: string;
  title: string;
  description?: string;
  isPublic: boolean;
  rating: number;
  ratingCount: number;
  createdAt: Date;
  updatedAt: Date;
  items: MovieList[];
  UserList: UserList[];
}
