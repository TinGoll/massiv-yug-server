import { Module } from '@nestjs/common';
import { WorkService } from './services/work/work.service';
import { WorkResolver } from './resolvers/work/work.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WorkEntity } from './entities/work.entity';

@Module({
  imports: [TypeOrmModule.forFeature([WorkEntity])],
  providers: [WorkService, WorkResolver],
  exports: [WorkService],
})
export class WorkModule {}
