import { Module } from '@nestjs/common';
import { RoomManager } from './room-manager';

@Module({
  imports: [],
  providers: [RoomManager],
  exports: [RoomManager],
})
export class ProcessingModule {}
