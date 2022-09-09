import { Module } from '@nestjs/common';
import { EngineProvider } from './providers/engine-provider';

@Module({
  providers: [EngineProvider]
})
export class EcsModule {}
