import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe, ClassSerializerInterceptor } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // ValidationPipe - для валидации входящих данных, whitelist - удаляет лишние поля, forbidNonWhitelisted - выбрасывает ошибку при наличии лишних полей
  // incoming request
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );

  // class-transformer @Exclude(), @Expose(), @Transform()....
  // outgoing response
  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));

  //swagger
  const config = new DocumentBuilder()
    .setTitle('RX-Beat API')
    .setDescription(
      'API for RX-Beat application - a platform for saving and sharing music playlists',
    )
    .setVersion('1.0')
    .addTag('music')
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, documentFactory);

  app.enableCors({
    origin: ['http://localhost:4200', 'https://rx-beat-api.onrender.com/'],
    credentials: true,
  });

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
