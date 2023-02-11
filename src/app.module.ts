import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { HttpModule } from '@nestjs/axios';
import { ApolloDriverConfig, ApolloDriver } from '@nestjs/apollo';
import { GraphQLModule } from '@nestjs/graphql';
import { RepositoryModule } from './modules/repository/repository.module';
import { MigrationModule } from './modules/migration/migration.module';
import { OrderProcessingModule } from './modules/order-processing/order-processing.module';
import { RequestModule } from './modules/request/request.module';
import { PersonModule } from './modules/person/person.module';
import { AuthModule } from './modules/auth/auth.module';
import { FinancialModule } from './modules/financial/financial.module';
import { TelegramModule } from './modules/telegram/telegram.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '../.env',
    }),
    // GraphQLModule.forRoot<ApolloDriverConfig>({
    //   driver: ApolloDriver,
    //   autoSchemaFile: 'schema.gql',
    //   sortSchema: true,
    //   playground: true,
    // }),
    // ServeStaticModule.forRoot({
    //   rootPath: join(__dirname, '..', '..', 'client', 'build'),
    //   renderPath: '/',
    //   serveStaticOptions: {},
    //   exclude: ['/api/*'],
    // }),
    HttpModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        timeout: configService.get('HTTP_TIMEOUT'),
        maxRedirects: configService.get('HTTP_MAX_REDIRECTS'),
      }),
      inject: [ConfigService],
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (config: ConfigService) => ({
        type: config.get<'postgres'>('TYPEORM_CONNECTION'),
        host: config.get<string>('TYPEORM_HOST'),
        username: config.get<string>('TYPEORM_USERNAME'),
        password: config.get<string>('TYPEORM_PASSWORD'),
        database: config.get<string>('TYPEORM_DATABASE'),
        port: config.get<number>('TYPEORM_PORT'),
        entities: [__dirname + 'dist/**/*.entity{.ts,.js}'],
        migrations: [__dirname + 'src/migrations/*{.js,.ts}'],
        migrationsTableName: 'migrations',
        synchronize: true,
        autoLoadEntities: true,
        logging: ['error', 'warn'], //'query',
      }),
    }),
    RepositoryModule,
    MigrationModule,
    OrderProcessingModule,
    RequestModule,
    PersonModule,
    AuthModule,
    FinancialModule,
    TelegramModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
