import { DocumentOptions, ElementOptions } from 'src/core/@types/app.types';
import { BookEntity } from 'src/modules/repository/order/entities/book.entity';
import { DocumentEntity } from 'src/modules/repository/order/entities/document.entity';
import { ComponentKey } from 'src/modules/repository/order/entities/element.entity';
import { BookCreateInput } from 'src/modules/repository/order/inputs/book.input';

const events = [
  'create-order',
  'add-element',
  'change-component',
  'assign-book-client',
  'assign-document-color',
  'assign-document-patina',
  'assign-document-varnish',
  'assign-document-material',
  'assign-document-profile',
  'assign-document-panel',
  'assign-document-note',
] as const;

export type RoomKeyType = number | string;

declare module Processing {
  export interface Action {
    roomId: RoomKeyType;
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

  /**
   *  'assign-color',
  'assign-patina',
  'assign-varnish',
  'assign-material',
  'assign-profile',
  'assign-note',
   */

  // События для изменения шапки здокумента
  export interface AssignDocumentColor<T> extends Action {
    event: 'assign-document-color';
    documentId: number;
    assignedName: string | null;
    options: T;
  }
  export interface AssignDocumentPatina<T> extends Action {
    event: 'assign-document-patina';
    documentId: number;
    assignedName: string | null;
    options: T;
  }
  export interface AssignDocumentVarnish<T> extends Action {
    event: 'assign-document-varnish';
    documentId: number;
    assignedName: string | null;
    options: T;
  }
  export interface AssignDocumentMaterial extends Action {
    event: 'assign-document-material';
    documentId: number;
    assignedName: string | null;
  }
  export interface AssignDocumentProfile<T> extends Action {
    event: 'assign-document-profile';
    documentId: number;
    assignedName: string | null;
    options: T;
  }
  export interface AssignDocumentPanel<T> extends Action {
    event: 'assign-document-panel';
    documentId: number;
    assignedName: string | null;
    options: T;
  }
  export interface AssignDocumentNote<T> extends Action {
    event: 'assign-document-note';
    documentId: number;
    assignedName: string | null;
    options: T;
  }
}

export default Processing;
