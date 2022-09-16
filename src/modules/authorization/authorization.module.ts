import { Module } from '@nestjs/common';
import { AuthService } from './services/auth/auth.service';
import { AuthController } from './controllers/auth/auth.controller';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { UserService } from '../repository/user/services/user/user.service';
import { UserModule } from '../repository/user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from '../repository/user/entities/user.entity';
import { RepositoryModule } from '../repository/repository.module';
import { JwtStrategy } from './services/strategy/jwt-strategy';
import { LocalStrategy } from './services/strategy/local-strategy';



@Module({
  imports: [
    RepositoryModule,
    PassportModule,
    TypeOrmModule.forFeature([UserEntity]),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: { expiresIn: configService.get<string>('JWT_EXPIRES_IN') },
      }),
      inject: [ConfigService],
    }),
  ],
  providers: [AuthService, UserService, JwtStrategy, LocalStrategy],
  controllers: [AuthController],
})
export class AuthorizationModule {}
