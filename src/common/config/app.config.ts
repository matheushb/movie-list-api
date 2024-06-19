import { INestApplication, ValidationPipe } from '@nestjs/common';

export default function appConfig(app: INestApplication<any>) {
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );
}
