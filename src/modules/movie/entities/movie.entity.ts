import { MovieList } from '@prisma/client';

export class Movie {
  id: string;
  title: string;
  overview: string;
  releaseDate: Date;
  adult: boolean;
  language: Language;
  genre: Genre;
  duration: number;
  rating: number;
  ratingCount: number;
  createdAt: Date;
  updatedAt: Date;
  listItems?: MovieList[];
}

export enum Language {
  EN = 'EN',
  ES = 'ES',
  FR = 'FR',
  DE = 'DE',
  IT = 'IT',
  RU = 'RU',
  PT = 'PT',
  JA = 'JA',
}

export enum Genre {
  ACTION = 'ACTION',
  COMEDY = 'COMEDY',
  DRAMA = 'DRAMA',
  HORROR = 'HORROR',
  ROMANCE = 'ROMANCE',
  THRILLER = 'THRILLER',
  SCIFI = 'SCIFI',
  FANTASY = 'FANTASY',
  ANIMATION = 'ANIMATION',
  DOCUMENTARY = 'DOCUMENTARY',
  CRIME = 'CRIME',
  MYSTERY = 'MYSTERY',
  ADVENTURE = 'ADVENTURE',
  FAMILY = 'FAMILY',
  HISTORY = 'HISTORY',
  WAR = 'WAR',
  WESTERN = 'WESTERN',
  MUSIC = 'MUSIC',
  SPORT = 'SPORT',
  BIOGRAPHY = 'BIOGRAPHY',
}
