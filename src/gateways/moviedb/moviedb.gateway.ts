import { Injectable } from '@nestjs/common';
import { Axios } from 'axios';

@Injectable()
export class MovieDbGateway {
  private readonly API_KEY: string;
  private readonly BASE_URL: string;
  private axios: Axios;

  constructor() {
    this.API_KEY = process.env.TMDB_API_KEY;
    this.BASE_URL = process.env.TMDB_BASE_URL;

    if (!this.API_KEY || !this.BASE_URL) {
      throw new Error('Missing TMDB_API_KEY or TMDB_BASE_URL in environment');
    }

    this.axios = new Axios({
      baseURL: this.BASE_URL,
      headers: {
        Authorization: `Bearer ${this.API_KEY}`,
        'Content-Type': 'application/json',
      },
    });
  }

  async seed(page: number = 1) {
    const response = await this.axios.get(
      `/movie/popular?include_adult=true&language=pt-BR&page=${page}&sort_by=popularity.desc`,
    );

    return JSON.parse(response.data).results;
  }
}
