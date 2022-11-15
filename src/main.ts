import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: ['error', 'debug', 'verbose', 'warn'],
    abortOnError: true,
  });
  const config = app.get(ConfigService);
  const port = config.get<number>('API_PORT') || 3000;
  app.enableCors();
  await app.listen(port, () => {
    console.log('\x1b[33m%s\x1b[0m', `Server started on port ${port}`);
  });
}
bootstrap();
