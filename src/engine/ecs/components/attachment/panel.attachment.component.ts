import { Component } from 'yug-entity-component-system';

interface PanelAttachmentItem<T> {
  index: number;
  item: T;
  hidden?: boolean;
}

export class PanelAttachmentComponent<T extends any = any> extends Component {

  public items: PanelAttachmentItem<T>[] = [];
  count: number = 0;

  constructor() {
    super(PanelAttachmentComponent);
  }
  add(item: T, index: number = 0) {
    if (index === 0) index = this.items.length;
    this.items.push({
      item,
      index,
      hidden: false,
    });
  }

  sort(order: 'ASC' | 'DESC' = 'ASC'): void {
    this.items.sort((a, b) => {
      if (a.index > b.index) return order === 'ASC' ? 1 : -1;
      if (a.index < b.index) return order === 'ASC' ? -1 : 1;
      return 0;
    });
  }

  delete(index: number): boolean {
    const arrayIndex = this.items.findIndex((i) => i.index === index);
    if (arrayIndex === -1) return false;
    this.items.splice(arrayIndex, 1);
    return true;
  }

  hidden(index: number): void {
    const item = this.find(index);
    if (!item) return;
    item.hidden = true;
  }
  visible(index: number): void {
    const item = this.find(index);
    if (!item) return;
    item.hidden = false;
  }
  find(index: number): PanelAttachmentItem<T> | null {
    const arrayIndex = this.items.findIndex((i) => i.index === index);
    if (arrayIndex === -1) return null;
    return this.items[arrayIndex] || null;
  }
}
