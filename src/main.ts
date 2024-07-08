import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { VersioningType } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { globalValidationPipe } from './utils/global-validation';
import { NestExpressApplication } from '@nestjs/platform-express';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    cors: true,
  });
  const configService = app.get(ConfigService);

  app.enableVersioning({
    defaultVersion: '1',
    type: VersioningType.URI,
  });

  app.useGlobalPipes(globalValidationPipe);

  const config = new DocumentBuilder()
    .setTitle('Employee-evaluation')
    .setDescription('Employee-evaluation API description')
    .setVersion('1.0')
    .addTag('he')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document, {
    swaggerOptions: { persistAuthorization: true },
  });

  const port = configService.get<number>('PORT');
  await app.listen(port, () => console.log(`Server running at port ${port}`));
}
bootstrap();
