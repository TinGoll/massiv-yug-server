import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { FinishingModule } from './finishing/finishing.module';
import { AttachmentModule } from './attachment/attachment.module';
import { WorkModule } from './work/work.module';
import { DbComponentModule } from './db-component/db-component.module';
import { DbEngineEntityModule } from './db-engine-entity/db-engine-entity.module';


@Module({
  imports: [UserModule, FinishingModule, AttachmentModule, WorkModule, DbComponentModule, DbEngineEntityModule]
})
export class RepositoryModule {}
