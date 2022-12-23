import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: ['error', 'debug', 'verbose', 'warn'],
  });

  app.enableCors({
    origin: (origin, callback) => {
      if (origin) {
        // console.log('allowed cors for:', origin);
        callback(null, true);
      } else {
        console.log('blocked cors for:', origin);
        // callback(new Error('Not allowed by CORS'));
      }
    },
    allowedHeaders:
      'X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept, Observe, Authorization, access-control-allow-origin',
    methods: 'GET,PUT,POST,DELETE,UPDATE,OPTIONS',
    credentials: true,
  });

  const config = app.get(ConfigService);
  const port = config.get<number>('API_PORT') || 3000;
  await app.listen(port, () => {
    console.log('\x1b[33m%s\x1b[0m', `Server started on port ${port}`);
  });
}
bootstrap();
