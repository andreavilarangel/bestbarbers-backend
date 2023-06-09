import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ErrorsInterceptor } from './shared/errors/error.interceptor';
import { configOpenApi } from './config/openApi';
import './config/patch';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors();
  app.useGlobalInterceptors(new ErrorsInterceptor());
  app.useGlobalPipes(new ValidationPipe({ transform: true }));

  configOpenApi(app);

  await app.listen(process.env.PORT || 3002);
}
bootstrap();
