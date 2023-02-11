import { Module } from '@nestjs/common';
import { Bot } from './bot';


@Module({
  imports: [],
  providers: [Bot]
})
export class TelegramModule {}
