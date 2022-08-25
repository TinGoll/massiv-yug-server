import { Unit } from "../../@types/other-types";
import { WorkDto } from "../../interfaces/dtos/model-dtos/work-dto";

export class Work {
  name: string;
  unit: Unit;
  price: number;
  cost: number;
  norm: number;
  dateBeginning: Date;
  dateEnd: Date;
  constructor(name: string) {
    this.name = name;
  }

  update(dto: Partial<WorkDto>): this {
    if (!dto) return this;
    if (typeof dto.cost !== "undefined") this.cost = dto.cost;
    if (typeof dto.dateBeginning !== "undefined") this.dateBeginning = dto.dateBeginning;
    if (typeof dto.dateEnd !== "undefined") this.dateEnd = dto.dateEnd;
    if (typeof dto.name !== "undefined") this.name = dto.name;
    if (typeof dto.norm !== "undefined") this.norm = dto.norm;
    if (typeof dto.price !== "undefined") this.price = dto.price;
    if (typeof dto.unit !== "undefined") this.unit = dto.unit;
    return this;
  }

  public static create(dto: WorkDto) {
    return new Work(dto.name).update(dto);
  }
  
}
