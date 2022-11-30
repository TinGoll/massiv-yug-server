import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { ItmHttpService } from './services/itm-http.service';
import { MigrationProvider } from './prividers/migration-provider';
import { RepositoryModule } from '../repository/repository.module';

@Module({
  imports: [HttpModule, RepositoryModule],
  providers: [ItmHttpService, MigrationProvider],
})
export class MigrationModule {}
