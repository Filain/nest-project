import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import { SwaggerHelper } from './common/helpers/swagger.helper';
import { AppModule } from './modules/app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('June-2023 API')
    .setDescription('API description')
    .addBearerAuth({
      type: 'http',
      scheme: 'bearer',
      bearerFormat: 'JWT',
      in: 'header',
    })
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerHelper.setDefaultResponses(document); // підключаємо наш SwaggerHelper мутуємо документ щоб він автоматично підкидував потрібні респонми
  SwaggerModule.setup('docs', app, document, {
    swaggerOptions: {
      docExpansion: 'list', // при відкритті чи розкриваються списки
      defaultModelExpandDepth: 3, // щоб бачити глибину моделі
      persistAuthorization: true, // Зберігання токена після перезавантаження сторінки
    },
  });
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true, //- цей параметр вказує, що дані будуть автоматично перетворюватись до відповідного типу.
      forbidNonWhitelisted: true, //- немає декоратора буде помилка.
      whitelist: true, //- немає декоратора заборонено.
    }),
  );

  await app.listen(3000);
}
bootstrap();
