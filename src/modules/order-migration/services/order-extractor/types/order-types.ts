

    export interface MigrationOrderElementData {
      id: number;
      orderId: number;
      name: string;
      height: number;
      width: number;
      depth: number;
      amount: number;
      square: number;
      note: string;
      calcAs: string;
      modPrice: string;
      cost: number;
      priceCost: number;
    }

    export interface MigrationOrderData {
      id: number;
      manager: string;
      client: string;
      orderNum: string;
      itmOrderNum: string;
      fasadMaterial: string;
      fasadModel: string;
      profileWidth: number;
      texture: string;
      panelMaterial: string;
      panelModel: string;
      colorName: string;
      panelColorName: string;
      colorType: string;
      varnishName: string;
      patinaName: string;
      orderSquare: number;
      fasadeSquare: number;
      note?: any;
      orderCost: number;
      orderPay: number;
      orderTotalCost: number;
      orderDiscount: number;
      orderDiscountComment: string;
      orderCostup: number;
      orderCostupComment: string;
      orderCostPack: number;
      orderCostGlass?: any;
      factDateReceive?: any;
      factDateFirstSave: string;
      factDateLastSave: string;
      factDateCalcCost: string;
      firstStageBad?: any;
      factDatePack?: any;
      factDateOrderOut?: any;
      statisId: number;
      orderType: string;
      textureComment?: any;
      varnishComment?: any;
      patinaComment?: any;
      prisadka: string;
      planDateFirstStage: Date;
      planDatePack: Date;
      termoshov: string;
      profileAngle: string;
      elements: MigrationOrderElementData[];
    }