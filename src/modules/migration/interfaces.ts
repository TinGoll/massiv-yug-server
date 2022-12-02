export interface ItmAuthor {
  userName: string;
}

export interface ItmClient {
  id: number;
  name: string;
  sity: string;
  phones: Array<string>;
  shortName: string;
  emails: Array<string>;
  note?: string;
}

export interface ItmMaterial {
  name: string;
}

export interface ItmProfile {
  name: string;
  widths: Array<number>;
  angle: string;
  prisadka: boolean;
  termoshov: boolean;
}

export interface ItmPanel {
  name: string;
  color?: ItmColor;
  material?: ItmMaterial;
}

export interface ItmOrderResult {
  generalSquare: number;
  fasadeSquare: number;
  elementCount: number;
}

export interface ItmOrderPayments {
  priceColumn?: number;
  cost: number;
  totalCost: number;
  payment: number;
  discount?: number;
  discountComment?: string;
  costUp?: number;
  costUpComment?: string;
  costPack?: number;
  costGlass?: number;
}

export interface ItmDates {
  receive?: string;
  firstSave: string;
  lastSave: string;
  recalculationCost: string;
  package?: string;
  shipment: string;
  orderCancel?: string;
  firstStage?: string;
  planFirstStage: string;
}

export interface ItmStatuses {
  oldStatus: {
    num: number;
    name: string;
  };
  status: string;
}

export interface ItmTexure {
  name: string;
  note?: string;
}

export interface ItmColor {
  name: string;
  type?: string;
  note?: string;
}

export interface ItmVarnish {
  name: string;
  note?: string;
}

export interface ItmPatina {
  name: string;
  note?: string;
}

export interface ItmLocation {
  sector: ItmSector;
}

export interface ItmSector {
  id: number;
  name: string;
}

export interface ItmGeometry {
  height?: number;
  width?: number;
  depht?: number;
  amount: number;
  square: number;
  linearMeters: number;
  cubature: number;
  perimeter: number;
}

export interface ItmElementPayments {
  calcAs: string;
  priceModifer: string;
  priceCost: number;
  cost: number;
  costSng: number;
  note?: string;
}

export interface ItmElement {
  id: number;
  orderId: number;
  name: string;
  note?: string;
  value: number;
  geometry: ItmGeometry;
  payments: ItmElementPayments;
}

export declare interface ItmOrder {
  id: number;
  author: ItmAuthor;
  client: ItmClient;
  clientNumber: string;
  itmOrderNumber: string;
  orderType: string;
  note: string;
  material: ItmMaterial;
  profile: ItmProfile;
  texture: ItmTexure;

  panel: ItmPanel;
  color: ItmColor;
  varnish: ItmVarnish;
  patina: ItmPatina;
  orderResult: ItmOrderResult;
  orderPayments: ItmOrderPayments;
  dates: ItmDates;
  statuses: ItmStatuses;
  reasonCancel?: string;
  userCanceled?: string;
  viewMode: string;
  location: ItmLocation;
  elements: ItmElement[];
}
