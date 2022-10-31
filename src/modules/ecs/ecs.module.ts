import { Module } from '@nestjs/common';
import { ComponentMapper } from './services/component-mapper';

@Module({
  providers: [ComponentMapper],
  exports: [ComponentMapper],
})
export class EcsModule {}
