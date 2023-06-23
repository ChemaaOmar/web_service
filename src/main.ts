import { NestFactory } from '@nestjs/core';
import { CoreModule } from './core/core.module';
import { Logger, ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(CoreModule);
  const globalPrefix = 'api';
  app.enableCors();
  app.useGlobalPipes(new ValidationPipe());
  app.setGlobalPrefix(globalPrefix);
  const port = process.env.PORT || 8000;
  await app.listen(port);
  Logger.log(
    `🚀 Application is running on: http://localhost:${port}/${globalPrefix}`,
  );
}

bootstrap();
