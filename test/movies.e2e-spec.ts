import { BcryptModule } from '@/common/bcrypt/bcrypt.module';
import appConfig from '@/common/config/app.config';
import { JWT_SECRET } from '@/common/config/constants';
import { PrismaModule } from '@/common/prisma/prisma.module';
import { PrismaService } from '@/common/prisma/prisma.service';
import { Paginator } from '@/common/utils/pagination';
import { AuthModule } from '@/modules/auth/auth.module';
import { AuthService } from '@/modules/auth/auth.service';
import { JwtStrategy } from '@/modules/auth/strategies/jwt.strategy';
import { LocalStrategy } from '@/modules/auth/strategies/local.strategy';
import { CreateMovieDto } from '@/modules/movie/dto/create-movie.dto';
import { UpdateMovieDto } from '@/modules/movie/dto/update-movie.dto';
import { Genre, Language } from '@/modules/movie/entities/movie.entity';
import { MovieModule } from '@/modules/movie/movie.module';
import { MovieRepository } from '@/modules/movie/movie.repository';
import { MovieService } from '@/modules/movie/movie.service';
import { UserModule } from '@/modules/user/user.module';
import { UserRepository } from '@/modules/user/user.repository';
import { UserService } from '@/modules/user/user.service';
import { INestApplication } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';

describe('Auth and User Modules (e2e)', () => {
  let app: INestApplication;
  let authToken: string;
  let createdUserId: string;
  let movieId: string;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        AuthModule,
        UserModule,
        MovieModule,
        BcryptModule,
        PrismaModule,
        JwtModule.register({
          secret: JWT_SECRET,
          signOptions: { expiresIn: '7d' },
        }),
      ],
      providers: [
        UserService,
        UserRepository,
        LocalStrategy,
        JwtStrategy,
        Paginator,
        MovieService,
        MovieRepository,
        PrismaService,
        AuthService,
      ],
    }).compile();

    app = moduleFixture.createNestApplication();

    appConfig(app);

    await app.init();
  });

  const createDto: CreateMovieDto = {
    title: 'Title Teste',
    overview:
      'Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.',
    releaseDate: new Date('1994-09-10'),
    adult: false,
    language: Language.EN,
    genre: [Genre.DRAMA],
    rating: 9.3,
    ratingCount: 123456,
  };

  it('/user (POST) - create user', async () => {
    const response = await request(app.getHttpServer())
      .post('/user')
      .send({
        email: 'movietestuser@example.com',
        password: 'testpass',
        name: 'Test User',
      })
      .expect(201);

    createdUserId = response.body.id;
    authToken = response.body.access_token;
    expect(response.body).toHaveProperty('email', 'movietestuser@example.com');
  });

  it('/movie (POST) - create movie', async () => {
    const response = await request(app.getHttpServer())
      .post('/movie')
      .set('Authorization', `Bearer ${authToken}`)
      .send(createDto)
      .expect(201);

    expect(response.body).toHaveProperty('id');
    expect(response.body).toHaveProperty('title', createDto.title);
    expect(response.body).toHaveProperty('overview', createDto.overview);
    expect(new Date(response.body.releaseDate)).toEqual(createDto.releaseDate);
    expect(response.body).toHaveProperty('adult', createDto.adult);
    expect(response.body).toHaveProperty('language', createDto.language);
    expect(response.body.genre).toEqual(
      expect.arrayContaining(createDto.genre),
    );
    expect(response.body).toHaveProperty('rating', createDto.rating);
    expect(response.body).toHaveProperty('ratingCount', createDto.ratingCount);

    movieId = response.body.id;
  });

  it('/movie (POST) - should fail creating movie with invalid data', async () => {
    const invalidDto = {
      title: 'Invalid Movie',
      overview: 'This movie has invalid data',
      releaseDate: 'invalid-date',
      adult: 'not-a-boolean',
      language: 'INVALID_LANGUAGE',
      genre: ['INVALID_GENRE'],
      rating: 11,
      ratingCount: -1,
    };

    await request(app.getHttpServer())
      .post('/movie')
      .set('Authorization', `Bearer ${authToken}`)
      .send(invalidDto)
      .expect(400);
  });

  it('/movie/:id (GET) - get movie by id', async () => {
    const getResponse = await request(app.getHttpServer())
      .get(`/movie/${movieId}`)
      .set('Authorization', `Bearer ${authToken}`)
      .expect(200);

    expect(getResponse.body).toHaveProperty('id', movieId);
    expect(getResponse.body).toHaveProperty('title', createDto.title);
    expect(getResponse.body).toHaveProperty('overview', createDto.overview);
    expect(new Date(getResponse.body.releaseDate)).toEqual(
      createDto.releaseDate,
    );
    expect(getResponse.body).toHaveProperty('adult', createDto.adult);
    expect(getResponse.body).toHaveProperty('language', createDto.language);
    expect(getResponse.body.genre).toEqual(
      expect.arrayContaining(createDto.genre),
    );
    expect(getResponse.body).toHaveProperty('rating', createDto.rating);
    expect(getResponse.body).toHaveProperty(
      'ratingCount',
      createDto.ratingCount,
    );
  });

  it('/movie/:id (GET) - should fail getting non-existent movie by id', async () => {
    const nonExistentMovieId = 'nonexistentmovieid';
    await request(app.getHttpServer())
      .get(`/movie/${nonExistentMovieId}`)
      .set('Authorization', `Bearer ${authToken}`)
      .expect(404);
  });

  it('/movie (GET) - get all movies', async () => {
    const response = await request(app.getHttpServer())
      .get('/movie')
      .set('Authorization', `Bearer ${authToken}`)
      .expect(200);

    expect(response.body.data).toBeInstanceOf(Array);
  });

  it('/movie/:id (PATCH) - update movie by id', async () => {
    const updateDto: UpdateMovieDto = {
      title: 'Updated Title',
      overview: 'Updated Overview',
      releaseDate: new Date('2000-01-01'),
      adult: true,
      language: Language.PT,
      genre: [Genre.COMEDY],
      rating: 8.5,
      ratingCount: 65432,
    };

    const updateResponse = await request(app.getHttpServer())
      .patch(`/movie/${movieId}`)
      .set('Authorization', `Bearer ${authToken}`)
      .send(updateDto)
      .expect(200);

    expect(updateResponse.body).toHaveProperty('id', movieId);
    expect(updateResponse.body).toHaveProperty('title', updateDto.title);
    expect(updateResponse.body).toHaveProperty('overview', updateDto.overview);
    expect(new Date(updateResponse.body.releaseDate)).toEqual(
      updateDto.releaseDate,
    );
    expect(updateResponse.body).toHaveProperty('adult', updateDto.adult);
    expect(updateResponse.body).toHaveProperty('language', updateDto.language);
    expect(updateResponse.body.genre).toEqual(
      expect.arrayContaining(updateDto.genre),
    );
    expect(updateResponse.body).toHaveProperty('rating', updateDto.rating);
    expect(updateResponse.body).toHaveProperty(
      'ratingCount',
      updateDto.ratingCount,
    );
  });

  it('/movie/:id (PATCH) - should fail updating movie with invalid data', async () => {
    const invalidDto = {
      title: '',
      overview: '',
      releaseDate: 'invalid-date',
      adult: 'not-a-boolean',
      language: 'INVALID_LANGUAGE',
      genre: ['INVALID_GENRE'],
      rating: 11,
      ratingCount: -1,
    };

    await request(app.getHttpServer())
      .patch(`/movie/${movieId}`)
      .set('Authorization', `Bearer ${authToken}`)
      .send(invalidDto)
      .expect(400);
  });

  it('/movie/:id (DELETE) - delete movie by id', async () => {
    const deleteResponse = await request(app.getHttpServer())
      .delete(`/movie/${movieId}`)
      .set('Authorization', `Bearer ${authToken}`)
      .expect(200);

    expect(deleteResponse.body).toHaveProperty('id', movieId);

    await request(app.getHttpServer())
      .get(`/movie/${movieId}`)
      .set('Authorization', `Bearer ${authToken}`)
      .expect(404);
  });

  it('/movie/:id (DELETE) - should fail deleting non-existent movie', async () => {
    const nonExistentMovieId = 'nonexistentmovieid';
    await request(app.getHttpServer())
      .delete(`/movie/${nonExistentMovieId}`)
      .set('Authorization', `Bearer ${authToken}`)
      .expect(404);
  });

  it('/user/:id (DELETE) - delete user by id', async () => {
    const response = await request(app.getHttpServer())
      .delete(`/user/${createdUserId}`)
      .set('Authorization', `Bearer ${authToken}`)
      .expect(200);

    expect(response.body).toHaveProperty('id', createdUserId);
  });

  afterAll(async () => {
    await app.close();
  });
});
