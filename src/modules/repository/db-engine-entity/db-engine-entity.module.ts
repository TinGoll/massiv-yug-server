import { Module } from '@nestjs/common';
import { DbEntityService } from './services/db-entity/db-entity.service';
import { DbEntityResolver } from './resolvers/db-entity/db-entity.resolver';

@Module({
  providers: [DbEntityService, DbEntityResolver]
})
export class DbEngineEntityModule {}
