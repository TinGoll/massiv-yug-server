import { DocumentOptions, ElementOptions } from 'src/core/@types/app.types';
import { SampleColorEntity } from 'src/modules/repository/color/entities/sample.color.entity';
import { SampleMaterialEntity } from 'src/modules/repository/material/entities/sample.material.entity';
import { BookEntity } from 'src/modules/repository/order/entities/book.entity';
import { DocumentEntity } from 'src/modules/repository/order/entities/document.entity';
import { ComponentKey } from 'src/modules/repository/order/entities/element.entity';
import { BookCreateInput } from 'src/modules/repository/order/inputs/book.input';
import { ElementUpdateInput } from 'src/modules/repository/order/inputs/element.input';
import { SamplePanelEntity } from 'src/modules/repository/panel/entities/sample.panel.entity';
import { SamplePatinaEntity } from 'src/modules/repository/patina/entities/sample.patina.entity';
import { SampleProfileEntity } from 'src/modules/repository/profile/entities/sample.profile.entity';
import { SampleVarnishEntity } from 'src/modules/repository/varnish/entities/sample.varnish.entity';

const events = [
  'update-book',
  'update-document',
  'create-order',
  'add-element',
  'add-document',
  'remove-element',
  'remove-document',
  'change-component',
  'assign-book-client',
  'assign-document-color',
  'assign-document-patina',
  'assign-document-varnish',
  'assign-document-material',
  'assign-document-profile',
  'assign-document-panel',
  'assign-document-note',
  'assign-document-panel-material',
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

  export interface AddDocumentResponse {
    document: DocumentEntity;
  }

  export interface AddElementAction extends Action {
    event: 'add-element';
    documentId: number;
    identifier: string;
    options?: ElementOptions;
  }

  export interface AddDocumentAction<D extends object = object> extends Action {
    event: 'add-document';
    options?: DocumentOptions;
    defaultData?: Partial<D>;
  }

  export interface RemoveDocument extends Action {
    event: 'remove-document';
    documentId: number;
  }

  export interface RemoveElement extends Action {
    event: 'remove-element';
    documentId: number;
    elementId: number;
  }

  export interface ChangeComponentAction extends Action {
    event: 'change-component';
    elementId: number;
    options?: ElementUpdateInput;
    data: Array<{
      componentKey: ComponentKey;
      componentData: object;
    }>;
  }

  // События для изменения шапки здокумента
  export interface AssignDocumentColor<T> extends Action {
    event: 'assign-document-color';
    documentId: number;
    color: SampleColorEntity | null;
    options?: T;
  }
  export interface AssignDocumentPatina<T> extends Action {
    event: 'assign-document-patina';
    documentId: number;
    patina: SamplePatinaEntity | null;
    options?: T;
  }
  export interface AssignDocumentVarnish<T> extends Action {
    event: 'assign-document-varnish';
    documentId: number;
    varnish: SampleVarnishEntity | null;
    options?: T;
  }
  export interface AssignDocumentMaterial extends Action {
    event: 'assign-document-material';
    documentId: number;
    material: SampleMaterialEntity | null;
  }
  export interface AssignDocumentProfile<T> extends Action {
    event: 'assign-document-profile';
    documentId: number;
    profile: SampleProfileEntity | null;
    options?: T;
  }
  export interface AssignDocumentPanel<T> extends Action {
    event: 'assign-document-panel';
    documentId: number;
    panel: SamplePanelEntity | null;
    options?: T;
  }

  export interface AssignDocumentPanelMaterial extends Action {
    event: 'assign-document-panel-material';
    documentId: number;
    material: SampleMaterialEntity | null;
  }

  export interface AssignDocumentNote<T> extends Action {
    event: 'assign-document-note';
    documentId: number;
    assignedName: string | null;
    options?: T;
  }
  export interface AssignBookClient<T> extends Action {
    event: 'assign-book-client';
    client: T;
  }

  export interface UpdateBook<T> extends Action {
    event: 'update-book';
    input: T;
  }
  export interface UpdateDocument<T> extends Action {
    event: 'update-document';
    documentId: number;
    input: T;
  }
}

export default Processing;
