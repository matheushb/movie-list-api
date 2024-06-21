import { MovieList } from '@prisma/client';

export class Movie {
  id: string;
  title: string;
  overview: string;
  releaseDate: Date;
  adult: boolean;
  language: Language;
  genre: Genre[];
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
  KO = 'KO',
}

export enum Genre {
  ACTION = 'ACTION', //28
  COMEDY = 'COMEDY', //35
  DRAMA = 'DRAMA', //18
  HORROR = 'HORROR', //27
  ROMANCE = 'ROMANCE', //10749
  THRILLER = 'THRILLER', //53
  SCIFI = 'SCIFI', //878
  FANTASY = 'FANTASY', //14
  ANIMATION = 'ANIMATION', //16
  DOCUMENTARY = 'DOCUMENTARY', //99
  CRIME = 'CRIME', //80
  MYSTERY = 'MYSTERY', //9648
  ADVENTURE = 'ADVENTURE', //12
  FAMILY = 'FAMILY', //10751
  HISTORY = 'HISTORY', //36
  WAR = 'WAR', //10752
  WESTERN = 'WESTERN', //37
  MUSIC = 'MUSIC', //10402
}
