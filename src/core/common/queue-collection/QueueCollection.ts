class QueueNode<T> {
  next: QueueNode<T> | null = null;
  previus: QueueNode<T> | null = null;
  value: T;
  constructor(value: T, next: QueueNode<T> | null = null) {
    this.next = next;
    this.value = value;
  }
}

export class QueueCollection<T> {
  private _bof: boolean = false;
  private _eof: boolean = false;
  private _size: number = 0;

  private _current: QueueNode<T> | null = null;

  private _head: QueueNode<T> | null = null;
  private _tail: QueueNode<T> | null = null;

  private _direction: number = 0;

  public comparator: (A: T, B: T) => number;

  constructor(comparator: (A: T, B: T) => number) {
    this.comparator = comparator;
  }

  /**добавление нового элемента в начало списка */
  prepend(item: T): this {
    const node = new QueueNode(item, this._head);
    if (this._head) this._head.previus = node;
    this._head = node;
    if (!this._current) this._current = this._head;
    if (!this._tail) this._tail = node;
    this._size++;
    return this;
  }
  /**добавление нового элемента в конец списка */
  append(item: T): this {
    const node = new QueueNode(item);
    if (this._tail) {
      this._tail.next = node;
      node.previus = this._tail;
    }
    this._tail = node;
    if (!this._head) this._head = node;
    if (!this._current) this._current = this._head;
    this._size++;
    return this;
  }

  next(): void {
    if (this._eof) return;
    this._direction = 1;
    if (this._bof) {
      this._current = this._head;
    } else {
      this._current = this._current?.next || null;
      if (!this._current) this._eof = true;
    }
  }

  previous(): void {
    if (this._bof) return;
    this._direction = -1;
    if (this._eof) {
      this._current = this._tail;
    } else {
      this._current = this._current?.previus || null;
      if (!this._current) this._bof = true;
    }
  }

  reset(): void {
    this._head = null;
    this._tail = null;
    this._current = null;
    this._size = 0;
    this._eof = false;
    this._bof = false;
  }

  goToStart(): void {
    this._current = this._head;
    this._eof = false;
    this._bof = false;
  }

  goToEnd(): void {
    this._current = this._tail;
    this._eof = false;
    this._bof = false;
  }

  get value(): T | null {
    return this._current?.value || null;
  }

  get BOF(): boolean {
    return this._bof;
  }

  get EOF(): boolean {
    return this._eof;
  }

  get size(): number {
    return this._size;
  }

  get head(): T | null {
    return this._head?.value || null;
  }

  get tail(): T | null {
    return this._tail?.value || null;
  }

  take(): T | null {
    if (!this._head || !this._current || this._bof || this._eof) {
      return null;
    }

    this._size--;
    let value = this._current.value;

    if (this._head && this.comparator(this._head.value, this._current.value) === 0) {
      this._head = this._head.next;
      //Разобратся
      if (!this._head && this._tail) {
        this._head = this._tail;
      }
    }

    let cr = this._head;

    if (cr) {
      while (cr?.next) {
        if (this.comparator(cr.next.value, this._current.value) === 0) {
          cr.next = cr.next.next;
        } else {
          cr = cr?.next;
        }
      }
    }

    if (this._tail && this.comparator(this._tail.value, this._current.value) === 0) {
      this._tail = this._current.previus;
    }

    return value;
  }

  findAndTake(callback: (value: T | null) => boolean): T | null {
    this.goToStart();
    let value: T | null = null;
    let i = 0
    while (!this.BOF && !this.EOF) {
       i++;
      if (callback(this.value)) {
        value = this.take();
        break;
      }
      this.next();
    }
    this.goToStart();
    return value;
  }

  /** Итератор класса */
  [Symbol.iterator]() {
    function* sequence(collection: QueueCollection<T>) {
      collection.goToStart();
      while (!collection.EOF) {
        yield collection.value;
        collection.next();
      }
    }
    return sequence(this);
  }
}
