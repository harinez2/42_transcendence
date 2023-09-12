import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import * as cookieParser from 'cookie-parser';
import { ValidationPipe } from '@nestjs/common';
import { FRONT_URL } from 'config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Swagger
  const config = new DocumentBuilder()
    .setTitle('42 transcendence')
    .setDescription('The 42 transcendence API description.')
    .setVersion('0.1')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  app.use(cookieParser());
  app.useGlobalPipes(new ValidationPipe());
  app.enableCors({
    origin: FRONT_URL,
    allowedHeaders:
      'Origin, X-Request-With, Content-Type, Accept, Authorization',
    credentials: true,
  });

  app.enableShutdownHooks();

  await app.listen(5000);
}
bootstrap();
