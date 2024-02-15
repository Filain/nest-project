import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

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
  SwaggerModule.setup('docs', app, document, {
    swaggerOptions: {
      docExpansion: 'list', // при відкритті чи розкриваються списки
      defaultModelExpandDepth: 3, // щоб бачити глибину моделі
      persistAuthorization: true, // Зберігання токена після перезавантаження сторінки
    },
  });

  await app.listen(3000);
}
bootstrap();
