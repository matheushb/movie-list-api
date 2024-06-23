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
import { CreateListDto } from '@/modules/list/dto/create-list.dto';
import { UpdateListDto } from '@/modules/list/dto/update-list.dto';
import { ListModule } from '@/modules/list/list.module';
import { ListRepository } from '@/modules/list/list.repository';
import { ListService } from '@/modules/list/list.service';
import { UserModule } from '@/modules/user/user.module';
import { UserRepository } from '@/modules/user/user.repository';
import { UserService } from '@/modules/user/user.service';
import { HttpStatus, INestApplication } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';

describe('Auth and User Modules (e2e)', () => {
  let app: INestApplication;
  let authToken: string;
  let createdUserId: string;
  let createdListId: string;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        AuthModule,
        UserModule,
        BcryptModule,
        PrismaModule,
        ListModule,
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
        ListService,
        ListRepository,
        PrismaService,
        AuthService,
      ],
    }).compile();

    app = moduleFixture.createNestApplication();

    appConfig(app);

    await app.init();
  });

  it('/user (POST) - create user', async () => {
    const response = await request(app.getHttpServer())
      .post('/user')
      .send({
        email: 'listuser@example.com',
        password: 'testpass',
        name: 'Test User',
      })
      .expect(201);

    createdUserId = response.body.id;
    authToken = response.body.access_token;
    expect(response.body).toHaveProperty('email', 'listuser@example.com');
  });

  it('/list (POST) - create list', async () => {
    const createDto: CreateListDto = {
      title: 'Best Action Movies',
      description: 'A curated list of the best action movies.',
      isPublic: true,
      rating: 9.0,
      ratingCount: 100,
    };

    const response = await request(app.getHttpServer())
      .post('/list')
      .set('Authorization', `Bearer ${authToken}`)
      .send(createDto)
      .expect(HttpStatus.CREATED);

    expect(response.body).toHaveProperty('id');
    expect(response.body).toHaveProperty('title', createDto.title);
    expect(response.body).toHaveProperty('description', createDto.description);
    expect(response.body).toHaveProperty('isPublic', createDto.isPublic);
    expect(response.body).toHaveProperty('rating', createDto.rating);
    expect(response.body).toHaveProperty('ratingCount', createDto.ratingCount);

    createdListId = response.body.id;
  });

  it('/list/:id (GET) - get list by id', async () => {
    const response = await request(app.getHttpServer())
      .get(`/list/${createdListId}`)
      .set('Authorization', `Bearer ${authToken}`)
      .expect(HttpStatus.OK);

    expect(response.body).toHaveProperty('id', createdListId);
  });

  it('/list (GET) - get all lists', async () => {
    const response = await request(app.getHttpServer())
      .get('/list')
      .set('Authorization', `Bearer ${authToken}`)
      .expect(HttpStatus.OK);

    expect(response.body.data).toBeInstanceOf(Array);
  });

  it('/list/:id (PATCH) - update list by id', async () => {
    const updateDto: UpdateListDto = {
      title: 'Updated List Title',
      description: 'Updated description of the list.',
      isPublic: false,
      rating: 0,
      ratingCount: 0,
    };

    const response = await request(app.getHttpServer())
      .patch(`/list/${createdListId}`)
      .set('Authorization', `Bearer ${authToken}`)
      .send(updateDto)
      .expect(HttpStatus.OK);

    expect(response.body).toHaveProperty('id', createdListId);
    expect(response.body).toHaveProperty('title', updateDto.title);
    expect(response.body).toHaveProperty('description', updateDto.description);
    expect(response.body).toHaveProperty('isPublic', updateDto.isPublic);
    expect(response.body).toHaveProperty('rating', updateDto.rating);
    expect(response.body).toHaveProperty('ratingCount', updateDto.ratingCount);
  });

  it('/list/rate/:id (POST) - rate list', async () => {
    const ratingDto = {
      rating: 9.5,
    };

    await request(app.getHttpServer())
      .post(`/list/rate/${createdListId}`)
      .set('Authorization', `Bearer ${authToken}`)
      .send(ratingDto)
      .expect(HttpStatus.OK);

    const response = await request(app.getHttpServer())
      .get(`/list/${createdListId}`)
      .set('Authorization', `Bearer ${authToken}`)
      .expect(HttpStatus.OK);

    expect(response.body).toHaveProperty('rating', 9.5);
    expect(response.body).toHaveProperty('ratingCount', 1);
  });

  it('/list/rate/:id (POST) - should fail rating with invalid rating value', async () => {
    const ratingDto = {
      rating: 15,
    };

    await request(app.getHttpServer())
      .post(`/list/rate/${createdListId}`)
      .set('Authorization', `Bearer ${authToken}`)
      .send(ratingDto)
      .expect(HttpStatus.BAD_REQUEST);
  });

  it('/list/:id (DELETE) - delete list by id', async () => {
    await request(app.getHttpServer())
      .delete(`/list/${createdListId}`)
      .set('Authorization', `Bearer ${authToken}`)
      .expect(HttpStatus.OK);

    await request(app.getHttpServer())
      .get(`/list/${createdListId}`)
      .set('Authorization', `Bearer ${authToken}`)
      .expect(HttpStatus.NOT_FOUND);
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
