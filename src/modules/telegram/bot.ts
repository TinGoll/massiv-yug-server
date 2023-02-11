import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Telegraf } from 'telegraf';
import { TelegramContext } from './context';
import * as LocalSession from 'telegraf-session-local';


@Injectable()
export class Bot {
  private readonly instance: Telegraf<TelegramContext>;
  private readonly logger = new Logger('Telegraf');

  constructor(private readonly configService: ConfigService) {
    const token = configService.get('BOT_TOKEN');
    const bot = new Telegraf(token, {
      contextType: TelegramContext,
    });

    const localSession = new LocalSession({
      database: 'telegraf_data.json',
      property: 'session',
      storage: LocalSession.storageFileAsync,
      format: {
        serialize: (obj) => JSON.stringify(obj, null, 2),
        deserialize: (str) => JSON.parse(str),
      },
      state: { messages: [] },
    });
    bot.use(localSession.middleware());

    bot.start((ctx) => {
      ctx.session.counter = ctx.session.counter || 0;
      ctx.session.counter++;
      ctx.reply(`Counter updated, new value: \`${ctx.session.counter}\``);
    });

    bot.help(async (ctx) => {
        ctx.reply(`Counter updated, new value: \`${ctx.session.counter}\``);
        // const dd = await ctx.sessionDB.get('messages').push([ctx.message]).write();
        // console.log(dd);
        
    });

    bot.command('/remove', (ctx) => {
      ctx.replyWithMarkdownV2(
        `Removing session from lowdb database: \`${JSON.stringify(
          ctx.session,
        )}\``,
      );
      // Setting session to null, undefined or empty object/array will trigger removing it from database
      ctx.session = null;
    });

    bot.launch();

    this.instance = bot;
  }
}
