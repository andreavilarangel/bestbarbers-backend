import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

export const configOpenApi = (app: INestApplication) => {
  const config = new DocumentBuilder()
    .setTitle('Bestbarbers web Api')
    // .setDescription('The cats API description')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
};
