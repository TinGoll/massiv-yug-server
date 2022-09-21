import { Person } from './person';

describe('Person', () => {
  it('should be defined', () => {
    expect(new Person()).toBeDefined();
  });
});
