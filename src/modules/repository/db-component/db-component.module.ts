import { Module } from '@nestjs/common';
import { DbComponentService } from './services/db-component/db-component.service';
import { DbComponentResolver } from './resolvers/db-component/db-component.resolver';

@Module({
  providers: [DbComponentService, DbComponentResolver]
})
export class DbComponentModule {}
