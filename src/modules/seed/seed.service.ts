import { Injectable } from '@nestjs/common';
import { MovieDbGateway } from 'src/gateways/moviedb/moviedb.gateway';
import { MovieService } from '../movie/movie.service';
import { Genre, Language } from '../movie/entities/movie.entity';

@Injectable()
export class SeedService {
  constructor(
    private readonly movieDbGateway: MovieDbGateway,
    private readonly movieService: MovieService,
  ) {}

  async seed() {
    const mappedGenres: Map<number, Genre> = new Map([
      [28, Genre.ACTION],
      [35, Genre.COMEDY],
      [18, Genre.DRAMA],
      [27, Genre.HORROR],
      [10749, Genre.ROMANCE],
      [53, Genre.THRILLER],
      [878, Genre.SCIFI],
      [14, Genre.FANTASY],
      [16, Genre.ANIMATION],
      [99, Genre.DOCUMENTARY],
      [80, Genre.CRIME],
      [9648, Genre.MYSTERY],
      [12, Genre.ADVENTURE],
      [10751, Genre.FAMILY],
      [36, Genre.HISTORY],
      [10752, Genre.WAR],
      [37, Genre.WESTERN],
      [10402, Genre.MUSIC],
    ]);

    const mappedLanguage: Map<string, Language> = new Map([
      ['en', Language.EN],
      ['es', Language.ES],
      ['fr', Language.FR],
      ['de', Language.DE],
      ['it', Language.IT],
      ['pt', Language.PT],
      ['ja', Language.JA],
      ['ko', Language.KO],
    ]);

    const movies = await this.movieDbGateway.seed();

    console.log(movies);

    for (const movie of movies) {
      const payload = {
        adult: movie.adult,
        overview: movie.overview,
        releaseDate: movie.release_date,
        title: movie.title,
        rating: movie.vote_average,
        ratingCount: movie.vote_count,
        genre: movie.genre_ids.map((genreId: number) =>
          mappedGenres.get(genreId),
        ),
        language: mappedLanguage.get(movie.original_language),
      };
      console.log(payload);
      await this.movieService.create(payload);
    }
  }
}
