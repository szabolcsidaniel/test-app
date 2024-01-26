import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {BadRequestException, ValidationPipe, ValidationError} from '@nestjs/common';
import * as dotenv from 'dotenv';
async function bootstrap() {
  dotenv.config();

  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.useGlobalPipes(new ValidationPipe({
    exceptionFactory: (validationErrors: ValidationError[] = []) => {
      return new BadRequestException(
          validationErrors.map((error) => ({
            field: error.property,
            error: Object.values(error.constraints).join(', '),
          })),
      );
    },
  }),);

  await app.listen(3000);
}
bootstrap();
