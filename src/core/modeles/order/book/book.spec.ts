import { Book } from './book';

describe('Book', () => {
  it('should be defined', () => {
    expect(new Book()).toBeDefined();
  });
});
