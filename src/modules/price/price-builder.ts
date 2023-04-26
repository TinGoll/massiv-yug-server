import { ElementEntity } from '../repository/order/entities/document.element.entity';
import { DocumentEntity } from '../repository/order/entities/document.entity';
import { PriceEntity } from './price.entity';
import { PriceMapper } from './price.mapper';
import { PriceTypes } from './price.types';

export class PriceBuilder {
  constructor(
    private readonly priceEntity: PriceEntity,
    private readonly priceMapper: PriceMapper,
  ) {}

  /** Завершить работу с прайс-конструктором */
  end(): PriceMapper {
    return this.priceMapper;
  }

  addElement(identifier: string): PriceElementEditor {
    if (!this.priceEntity.conditionTree?.elements) {
      this.priceEntity.conditionTree.elements = [];
    }
    const candidate = this.priceEntity.conditionTree?.elements?.find(
      (e) => e.identifier === identifier,
    );

    if (!candidate) {
      const element: PriceTypes.Element = {
        identifier,
        basePrice: 0,
        document: {},
        element: {},
      };
      this.priceEntity.conditionTree.elements.push(element);
      return new PriceElementEditor(element, this);
    }

    return new PriceElementEditor(candidate, this);
  }

  /** Сохранить прайс. */
  save(): this {
    this.priceMapper.updatePrice(this.priceEntity).subscribe({
      next(value) {
        console.log('updatePrice', value);
      },
    });
    return this;
  }
}

class PriceElementEditor {
  constructor(
    private readonly element: PriceTypes.Element,
    private readonly priceBuilder: PriceBuilder,
  ) {}

  /** Задать цену. */
  setPrice(value: number): this {
    this.element.basePrice = value;
    return this;
  }

  /** Завершить работу над элементом, получить снова конструктор. */
  end(): PriceBuilder {
    return this.priceBuilder;
  }
  /** Добавить правило для документа.  */
  addDocumentRule(object: PriceTypes.OrderDocument): this {
    this.element.document = {
      ...this.element.document,
      ...object,
    };

    return this;
  }

  /** Добавить правило для элемента. */
  addElementRule(object: PriceTypes.OrderElement): this {
    this.element.element = {
      ...this.element.element,
      ...object,
    };

    return this;
  }
}

export class PriceModifier {
  private document?: Partial<DocumentEntity>;
  private documentElement?: ElementEntity;
  constructor(private readonly priceElement: PriceTypes.Element) {}

  assignDocument(document: Partial<DocumentEntity>): this {
    this.document = document;
    return this;
  }

  assignElement(documentElement: ElementEntity): this {
    this.documentElement = documentElement;
    return this;
  }

  get(): number {
    const modifers = [];
    if (!this.document && !this.documentElement) {
      return this.priceElement.basePrice || 0;
    }

    if (this.document) {
      if (this.priceElement?.document) {
        for (const key in this.priceElement.document) {
        }
      }
    }

    return 0;
  }

  private recursiveSearch(obj: object, temp: any[] = []) {
    if (obj) {
      if ((<PriceTypes.Modifer>obj).modiferOperator) {
        temp.push([obj]);
        return temp;
      } else {
      }
    }
    return temp;
  }
}
