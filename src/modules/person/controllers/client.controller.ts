import {
  Body,
  Controller,
  Get,
  HttpCode,
  Post,
  UseGuards,
} from '@nestjs/common';
import { async, from, map, Observable } from 'rxjs';
import { JwtAuthGuard } from 'src/modules/auth/guards/jwt-auth.guard';
import { PersonEntity } from '../entities/person.entity';
import { ClientCreateInput } from '../inputs/person.input';
import { PersonService } from '../services/person.service';

@Controller('api/clients')
export class ClientController {
  constructor(private readonly personService: PersonService) {}

  //   @UseGuards(JwtAuthGuard)
  @Post()
  @HttpCode(201)
  create(
    @Body() clientCreateInput: ClientCreateInput,
  ): Observable<PersonEntity> {
    return from(this.personService.createClient(clientCreateInput));
  }

  //   @UseGuards(JwtAuthGuard)
  @Get()
  @HttpCode(200)
  allClients(): Observable<any> {
    return from(this.personService.allClients());
  }
}
