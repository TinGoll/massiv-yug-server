import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { ItmHttpService } from './services/itm-http.service';
import { MigrationProvider } from './prividers/migration-provider';
import { RepositoryModule } from '../repository/repository.module';
import { OrderProcessingModule } from '../order-processing/order-processing.module';

@Module({
  imports: [HttpModule, RepositoryModule, OrderProcessingModule],
  providers: [ItmHttpService, MigrationProvider],
})
export class MigrationModule {}
