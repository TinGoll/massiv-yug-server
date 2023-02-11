import { Context, Telegram } from 'telegraf';
import { Update, UserFromGetMe } from 'typegram';

interface SessionDB {
  get: (key: string) => SessionDB;
  push: (data: any) => SessionDB;
  write: () => void;
}

export class TelegramContext<T extends any = any> extends Context {
  public session: T;
  public sessionDB: SessionDB;

  constructor(update: Update, telegram: Telegram, botInfo: UserFromGetMe) {
    // console.log('Creating context for %j', update);
    super(update, telegram, botInfo);
  }

  reply(...args: Parameters<Context['reply']>) {
    // console.log('reply called with args: %j', args);
    return super.reply(...args);
  }
}
