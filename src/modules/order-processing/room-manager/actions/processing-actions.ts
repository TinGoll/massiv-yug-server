import { DocumentOptions, ElementOptions } from 'src/core/@types/app.types';
import { BookEntity } from 'src/modules/repository/order/entities/book.entity';
import { DocumentEntity } from 'src/modules/repository/order/entities/document.entity';
import { ComponentKey } from 'src/modules/repository/order/entities/element.entity';
import { BookCreateInput } from 'src/modules/repository/order/inputs/book.input';

const events = [
  'create-order',
  'add-element',
  'change-component',
] as const;

export type RoomKeyType = number | string;

declare module Processing {
  export interface Action {
    event: Event;
  }

  export type Event = typeof events[number];

  export interface CreateOrderAction {
    option?: BookCreateInput;
  }
  export interface CreateOrderResponse {
    roomId: RoomKeyType;
    book: BookEntity;
  }

  export type CloseOrderAction = RoomKeyType;
  export interface CloseOrderResponse {
    roomId: RoomKeyType;
  }
  export type OpenOrderAction = RoomKeyType;
  export interface OpenOrderResponse {
    roomId: RoomKeyType;
    book: BookEntity;
  }

  export interface AddDocumentAction {
    bookId: number;
    option?: DocumentOptions;
  }

  export interface AddDocumentResponse {
    document: DocumentEntity;
  }

  export interface AddElementAction extends Action {
    event: 'add-element';
    documentId: number;
    identifier: string;
    options?: ElementOptions;
  }

  export interface ChangeComponentAction<T extends object = object>
    extends Action {
    event: 'change-component';
    elementId: number;
    componentKey: ComponentKey;
    data: Partial<T>;
  }
}

export default Processing;
