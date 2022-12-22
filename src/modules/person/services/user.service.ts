import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Observable, from, map, switchMap, tap } from 'rxjs';
import { AuthService } from 'src/modules/auth/services/auth.service';
import { PersonEntity } from '../entities/person.entity';
import { LoginUserInput } from '../inputs/login.user.input';
import { PersonCreateInput } from '../inputs/person.input';
import { PersonService } from './person.service';

@Injectable()
export class UserService {
  constructor(
    private readonly authService: AuthService,
    private readonly personService: PersonService,
  ) {}

  /**
   * Метод для входа в учетную запись
   * @param loginUserInput
   */
  login(
    loginUserInput: LoginUserInput,
  ): Observable<{ token: string; user: PersonEntity | null }> {
    return this.findByLogin(loginUserInput.login)
      .pipe(
        tap((user) => {
          if (!user) {
            throw new HttpException(
              `Пользователь "${loginUserInput.login}" не найден.`,
              HttpStatus.NOT_FOUND,
            );
          }
          return user;
        }),
      )
      .pipe(
        switchMap((user) =>
          this.validatePassword(loginUserInput.password, user?.password).pipe(
            switchMap((passwordMatches) => {
              if (passwordMatches) {
                return this.findOne(user?.id!).pipe(
                  switchMap((user) => {
                    return this.authService
                      .generateJwt(user!)
                      .pipe(map((token) => ({ token, user })));
                  }),
                );
              } else {
                throw new UnauthorizedException();
              }
            }),
          ),
        ),
      );
  }

  create(
    input: PersonCreateInput & { phone?: string },
  ): Observable<PersonEntity> {
    return this.loginExists(input.login).pipe(
      switchMap((exists) => {
        if (!exists) {
          return this.authService.hashPassword(input.password).pipe(
            switchMap((hashPassword) => {
              input.password = hashPassword;
              return from(this.personService.create(input)).pipe(
                map((savedUser) => {
                  const { password, ...user } = savedUser;
                  return user;
                }),
              );
            }),
          );
        } else {
          throw new HttpException(
            `Логин ${input.login} уже занят.`,
            HttpStatus.CONFLICT,
          );
        }
      }),
    );
  }

  /** Проверка авторизации и обновление токена. */
  authorizationCheck(user: PersonEntity): Observable<{
    token: string;
    user: PersonEntity | null;
  }> {
    return this.findOne(user.id)
      .pipe(
        tap((user) => {
          if (!user) {
            throw new UnauthorizedException();
          }
          return user;
        }),
      )
      .pipe(
        switchMap((user) => {
          return this.authService
            .generateJwt(user!)
            .pipe(map((token) => ({ token, user })));
        }),
      );
  }

  findAll(): Observable<PersonEntity[]> {
    return from(this.personService.findAll());
  }

  findOne(id: number): Observable<PersonEntity | null> {
    return from(this.personService.findOne(id)).pipe(
      map((user) => {
        if (!user) return null;
        const { password, ...data } = user;
        return data;
      }),
    );
  }

  private findByLogin(login: string): Observable<PersonEntity | null> {
    return from(this.personService.findByLogin(login));
  }

  private validatePassword(
    password: string,
    hash?: string,
  ): Observable<boolean> {
    return this.authService.comparePassword(password, String(hash));
  }

  /** Существует ли логин */
  private loginExists(login: string): Observable<boolean> {
    return from(this.personService.findIdByLogin(login)).pipe(
      map((id: number) => {
        return Boolean(id);
      }),
    );
  }
}
