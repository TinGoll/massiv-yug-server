import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { ItmHttpService } from './services/itm-http/itm-http.service';
import { OrderExtractorService } from './services/order-extractor/order-extractor.service';
import { MigrationProvider } from './providers/migration-provider';
import { RepositoryModule } from '../repository/repository.module';


@Module({
  imports: [HttpModule, RepositoryModule],
  providers: [ItmHttpService, OrderExtractorService, MigrationProvider],
  exports: [OrderExtractorService, ItmHttpService],
})
export class OrderMigrationModule {}
