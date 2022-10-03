import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserEntity } from 'src/modules/repositories/user/entities/user.entity';
import { UserService } from 'src/modules/repositories/user/services/user/user.service';


@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private jwtService: JwtService,
  ) {}

  async validate(login: string, pass: string): Promise<UserEntity | null> {
    const user: UserEntity = await this.userService.findByLogin(login);
    if (user && user.password === pass) {
      const { password, ...secureUser } = user;

      return secureUser;
    }
    return null;
  }

  async login(user: UserEntity) {
    const payload = { id: user.id, name: user.name };
    return {
      accessToken: this.jwtService.sign(payload),
    };
  }
}
