import { Module } from '@nestjs/common';
import { EcsModule } from './ecs/ecs.module';

@Module({
  imports: [EcsModule],
  providers: [],
})
export class EngineModule {}
