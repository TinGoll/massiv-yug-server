import { BookEntity } from 'src/modules/repository/order/entities/book.entity';

export type RoomEventStateListener = (
  roomId: number | string,
  state: BookEntity,
) => void;
export type RoomEventListener = (...args: any[]) => void;
export type UnsubscribeFunction = () => void;
