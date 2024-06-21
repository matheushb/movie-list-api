import { INestApplication, ValidationPipe } from '@nestjs/common';
import { LoggingInterceptor } from '../middlewares/interceptors/request-logger.interceptor';
import { AllExceptionsFilter } from '../middlewares/filters/all-exception.filter';
import { HttpAdapterHost } from '@nestjs/core';

export default function appConfig(app: INestApplication<any>) {
  app.useGlobalInterceptors(new LoggingInterceptor());

  app.useGlobalFilters(new AllExceptionsFilter(app.get(HttpAdapterHost)));
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );
}
