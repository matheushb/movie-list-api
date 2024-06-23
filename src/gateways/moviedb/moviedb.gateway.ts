import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { Axios } from 'axios';

@Injectable()
export class MovieDbGateway {
  private readonly API_KEY: string;
  private readonly BASE_URL: string;
  private axios: Axios;

  constructor() {
    this.API_KEY = process.env.TMDB_API_KEY;
    this.BASE_URL = process.env.TMDB_BASE_URL;

    this.axios = new Axios({
      baseURL: this.BASE_URL,
      headers: {
        Authorization: `Bearer ${this.API_KEY}`,
        'Content-Type': 'application/json',
      },
    });
  }

  async seed(page: number = 1) {
    if (!this.API_KEY || !this.BASE_URL) {
      throw new InternalServerErrorException(
        'Missing TMDB_API_KEY or TMDB_BASE_URL in environment',
      );
    }

    const response = await this.axios.get(
      `/movie/popular?include_adult=true&language=pt-BR&page=${page}&sort_by=popularity.desc`,
    );

    return JSON.parse(response.data).results;
  }
}
