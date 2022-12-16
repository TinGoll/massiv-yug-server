import { Module } from '@nestjs/common';
import { PersonController } from './controllers/person.controller';
import { PersonService } from './services/person.service';

@Module({
  providers: [PersonService],
  controllers: [PersonController],
})
export class PersonModule {}
