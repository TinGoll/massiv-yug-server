import { Unit } from "../../@types/other-types";
import { IDto } from "../../interfaces/dto-interface";
import { WorkDto } from "../../interfaces/dtos/model-dtos/work-dto";

export class Work implements IDto<WorkDto> {
  id: number = 0;
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
  getDto(): WorkDto {
    return {
      id: this.id,
      name: this.name,
      unit: this.unit,
      price: this.price,
      cost: this.cost,
      norm: this.norm,
      dateBeginning: this.dateBeginning,
      dateEnd: this.dateEnd,
    };
  }

  update(dto: Partial<WorkDto>): this {
    if (!dto) return this;
    if (typeof dto.id !== 'undefined') this.id = dto.id;
    if (typeof dto.cost !== 'undefined') this.cost = dto.cost;
    if (typeof dto.dateBeginning !== 'undefined')
      this.dateBeginning = dto.dateBeginning;
    if (typeof dto.dateEnd !== 'undefined') this.dateEnd = dto.dateEnd;
    if (typeof dto.name !== 'undefined') this.name = dto.name;
    if (typeof dto.norm !== 'undefined') this.norm = dto.norm;
    if (typeof dto.price !== 'undefined') this.price = dto.price;
    if (typeof dto.unit !== 'undefined') this.unit = dto.unit;
    return this;
  }

  public static define(dto: WorkDto) {
    return new Work(dto.name).update(dto);
  }
}
