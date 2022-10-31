import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { ItmHttpService } from './services/itm-http/itm-http.service';
import { OrderExtractorService } from './services/order-extractor/order-extractor.service';
import { MigrationProvider } from './providers/migration-provider';
import { RepositoryModule } from '../repository/repository.module';
import { EcsModule } from '../ecs/ecs.module';

@Module({
  imports: [HttpModule, RepositoryModule, EcsModule],
  providers: [ItmHttpService, OrderExtractorService, MigrationProvider],
  exports: [OrderExtractorService, ItmHttpService],
})
export class OrderMigrationModule {}
