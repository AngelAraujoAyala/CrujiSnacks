import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import { join } from 'path';
import { NestExpressApplication } from '@nestjs/platform-express';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.useStaticAssets(join(__dirname, '..', 'uploads'), {
    prefix: '/uploads/',
  });

  // Configuración de validaciones automáticas
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true, // Borra datos que no estén en el DTO
    forbidNonWhitelisted: true, // Lanza error si mandan datos extra
    transform: true, // Transforma tipos automáticamente
  }));

  app.enableCors(); // <-- Para que React pueda comunicarse con el Backend

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
