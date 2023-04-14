import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { ItmHttpService } from './services/itm-http.service';
import { MigrationProvider } from './prividers/migration-provider';
import { RepositoryModule } from '../repository/repository.module';
import { OrderProcessingModule } from '../order-processing/order-processing.module';
import { PersonModule } from '../person/person.module';

@Module({
  imports: [HttpModule, RepositoryModule, OrderProcessingModule, PersonModule],
  providers: [ItmHttpService, MigrationProvider],
})
export class MigrationModule {}
