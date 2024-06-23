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

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        AuthModule,
        UserModule,
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
        email: 'testuser@example.com',
        password: 'testpass',
        name: 'Test User',
      })
      .expect(201);

    createdUserId = response.body.id;
    expect(response.body).toHaveProperty('email', 'testuser@example.com');
  });

  it('/user (POST) - should fail creating user with existing email', async () => {
    await request(app.getHttpServer())
      .post('/user')
      .send({
        email: 'testuser@example.com',
        password: 'newpassword',
        name: 'New User',
      })
      .expect(409);

    await request(app.getHttpServer())
      .post('/user')
      .send({
        email: 'testuser@example.com',
        name: 'New User',
      })
      .expect(400);

    await request(app.getHttpServer())
      .post('/user')
      .send({
        password: 'newpassword',
        name: 'New User',
      })
      .expect(400);
  });

  it('/auth/signin (POST) - signin user', async () => {
    const response = await request(app.getHttpServer())
      .post('/auth/signin')
      .send({ username: 'testuser@example.com', password: 'testpass' })
      .expect(201);

    authToken = response.body.access_token;
    expect(response.body).toHaveProperty('access_token');
  });

  it('/auth/signin (POST) - should fail signin with incorrect credentials', async () => {
    await request(app.getHttpServer())
      .post('/auth/signin')
      .send({ username: 'testuser@example.com', password: 'wrongpassword' })
      .expect(401);
  });

  it('/auth/profile (GET) - get user profile', async () => {
    const profileResponse = await request(app.getHttpServer())
      .get('/auth/profile')
      .set('Authorization', `Bearer ${authToken}`)
      .expect(200);

    expect(profileResponse.body).toHaveProperty(
      'email',
      'testuser@example.com',
    );
  });

  it('/user/:id (GET) - should fail getting non-existent user by id', async () => {
    const nonExistentUserId = 'nonexistentuserid';
    await request(app.getHttpServer())
      .get(`/user/${nonExistentUserId}`)
      .set('Authorization', `Bearer ${authToken}`)
      .expect(404);
  });

  it('/user/add-favorite-genre (POST) - add favorite genre', async () => {
    const response = await request(app.getHttpServer())
      .post('/user/add-favorite-genre')
      .set('Authorization', `Bearer ${authToken}`)
      .send({ genre: ['ACTION'] })
      .expect(200);

    expect(response.body.favoriteGenres).toContain('ACTION');
  });

  it('/user/add-favorite-genre (POST) - should fail adding favorite genre with invalid payload', async () => {
    await request(app.getHttpServer())
      .post('/user/add-favorite-genre')
      .set('Authorization', `Bearer ${authToken}`)
      .send({ genre: ['INVALID_GENRE'] })
      .expect(400);
  });

  it('/user/remove-favorite-genre (POST) - remove favorite genre', async () => {
    await request(app.getHttpServer())
      .post('/user/add-favorite-genre')
      .set('Authorization', `Bearer ${authToken}`)
      .send({ genre: ['ACTION'] });

    const response = await request(app.getHttpServer())
      .post('/user/remove-favorite-genre')
      .set('Authorization', `Bearer ${authToken}`)
      .send({ genre: ['ACTION'] })
      .expect(200);

    expect(response.body.favoriteGenres).not.toContain('ACTION');
  });

  it('/user (GET) - get all users', async () => {
    const response = await request(app.getHttpServer())
      .get('/user')
      .set('Authorization', `Bearer ${authToken}`)
      .expect(200);

    expect(response.body.data).toBeInstanceOf(Array);
  });

  it('/user/:id (GET) - get user by id', async () => {
    const response = await request(app.getHttpServer())
      .get(`/user/${createdUserId}`)
      .set('Authorization', `Bearer ${authToken}`)
      .expect(200);

    expect(response.body).toHaveProperty('id', createdUserId);
  });

  it('/user/:id (PATCH) - update user by id', async () => {
    const response = await request(app.getHttpServer())
      .patch(`/user/${createdUserId}`)
      .set('Authorization', `Bearer ${authToken}`)
      .send({ name: 'Updated User' })
      .expect(200);

    expect(response.body).toHaveProperty('name', 'Updated User');
  });

  it('/user/:id (PATCH) - should fail updating user with invalid data', async () => {
    await request(app.getHttpServer())
      .patch(`/user/${createdUserId}`)
      .set('Authorization', `Bearer ${authToken}`)
      .send({ email: '' })
      .expect(400);
  });

  it('/user/:id (DELETE) - should fail deleting non-existent user', async () => {
    const nonExistentUserId = 'nonexistentuserid';
    await request(app.getHttpServer())
      .delete(`/user/${nonExistentUserId}`)
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
