import { Server, Socket } from 'socket.io';
import { Book } from 'src/core/modeles/order/book/book';
import { RoomManager } from '../../room-manager';
import { Room } from '../room';

export class OrderRoom extends Room {
  /** Книга заказа */
  private book: null | Book;

  constructor(roomManager: RoomManager) {
    super(roomManager);
  }

  setBook(book: null | Book): this {
    this.book = book || null;
    return this;
  }

  newBook() {
    this.book = Book.new();
  }

  getBook(): Book | null {
    return this.book;
  }

  getRoomState(): {roomId: string, bookState: any} {
    return {
      roomId: this.id,
      bookState: this.book?.getState() || null
    }
  }

  async command(
    server: Server,
    client: Socket,
    ...args: any[]
  ): Promise<void> {
    
  }

  async afterCreation(): Promise<void> {
    console.log(this.id, this.roomType, 'afterCreation');
  }

  async destroy(): Promise<void> {
    console.log(this.id, this.roomType, 'destroy');
  }
}
