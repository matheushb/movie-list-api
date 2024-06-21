import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { Request, Response } from 'express';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  constructor(private readonly httpAdapterHost: HttpAdapterHost) {}

  private logger = new Logger('HTTP');
  catch(exception: unknown, host: ArgumentsHost): void {
    const { httpAdapter } = this.httpAdapterHost;

    const ctx = host.switchToHttp();
    const path = httpAdapter.getRequestUrl(ctx.getRequest());
    const response: Response = ctx.getResponse();
    const request: Request = ctx.getRequest();

    const timestamp = new Date().toISOString();
    let statusCode = HttpStatus.INTERNAL_SERVER_ERROR;
    let message = 'Internal server error';

    if (exception instanceof HttpException) {
      statusCode = exception.getStatus();
      console.log(exception);

      if (exception.getResponse() instanceof Object) {
        message =
          exception.getResponse()['message'] ||
          exception.getResponse()['error'];
      } else {
        message = exception.message;
      }
    }

    if (exception instanceof PrismaClientKnownRequestError) {
      if (exception.code === 'P2002' || exception.code === 'P2003') {
        statusCode = HttpStatus.CONFLICT;
        message = `${exception.meta.target} already exists`;
      }

      if (exception.code === 'P2025') {
        statusCode = HttpStatus.NOT_FOUND;
        message = `${exception.meta.modelName} not found`;
      }
    }

    this.logger.error(`${request.method} ${request.url} ${statusCode}`);

    const responseBody = {
      statusCode,
      timestamp,
      message,
      path,
    };

    httpAdapter.reply(response, responseBody, statusCode);
  }
}
