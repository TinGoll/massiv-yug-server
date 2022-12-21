import {
  Body,
  Controller,
  Get,
  HttpCode,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { map, Observable } from 'rxjs';
import { JwtAuthGuard } from 'src/modules/auth/guards/jwt-auth.guard';
import { PersonEntity } from '../entities/person.entity';
import { LoginUserInput } from '../inputs/login.user.input';
import { PersonCreateInput } from '../inputs/person.input';
import { UserService } from '../services/user.service';

@Controller('api/users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('create')
  @HttpCode(201)
  create(
    @Body() personCreateInput: PersonCreateInput & {phone?: string},
  ): Observable<PersonEntity> {
    return this.userService.create(personCreateInput);
  }

  @Post('login')
  @HttpCode(200)
  login(@Body() loginUserInput: LoginUserInput): Observable<object> {
    return this.userService.login(loginUserInput).pipe(
      map((response) => ({
        access_token: response.token,
        user: response.user,
        token_type: 'JWT',
        expires_in: 10000,
      })),
    );
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  @HttpCode(200)
  findAllUsers(
    @Req() request: { user: PersonEntity },
  ): Observable<PersonEntity[]> {
    return this.userService.findAll();
  }
}
