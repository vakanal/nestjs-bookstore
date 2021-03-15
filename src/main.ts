import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { ConfigSection } from '../config/config.enum';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  const port = configService.get(ConfigSection.HTTP_PORT);
  app.setGlobalPrefix('api');
  await app.listen(port);
}
bootstrap();
