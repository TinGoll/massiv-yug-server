import { Module } from '@nestjs/common';
import { MigrationModule } from '../migration/migration.module';
import { RepositoryModule } from '../repository/repository.module';
import { TestController } from './controllers/test.controller';


@Module({
  imports: [RepositoryModule],
  controllers: [TestController],
})
export class ApiModule {}
