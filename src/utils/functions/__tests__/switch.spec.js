import Switch from '../Switch';

const fn1 = () => {
  return 'value 1';
};

const fn2 = () => 'value 2';

describe('Switch', () => {
  it('should return the key', () => {
    const type = 'FN_1';

    const value = Switch.on(type);

    expect(value.key()).toBe(type);
  });

  describe('when passes funtions to cases', () => {
    it('should find the case and rerurn function call to fn1', () => {
      const type = 'FN_1';
      const defaultReturn = 'defaultReturn';

      const value = Switch.of(type)
        .case('FN_1', fn1)
        .case('FN_2', fn2)
        .default(defaultReturn);

      expect(value).toBe(fn1());
    });

    it('should find the case and rerurn function call to fn2', () => {
      const type = 'FN_2';
      const defaultReturn = 'defaultReturn';

      const value = Switch.to(type)
        .case('FN_1', fn1)
        .case('FN_2', fn2)
        .default(defaultReturn);

      expect(value).toBe(fn2());
    });

    it('should find the case and rerurn function call to default', () => {
      const type = 'FN_3';
      const defaultReturn = 'defaultReturn';

      const value = Switch.to(type)
        .case('FN_1', fn1)
        .case('FN_2', fn2)
        .default(defaultReturn);

      expect(value).toBe(defaultReturn);
    });

    it('should find the case and rerurn function call to fn1 - using GET', () => {
      const type = 'FN_1';

      const value = Switch.to(type)
        .case('FN_1', fn1)
        .case('FN_2', fn2)
        .get();

      expect(value).toBe(fn1());
    });
  });

  describe('when pass objects and values to cases instade functions', () => {
    it('should find the case and return the case 1', () => {
      const type = 'C1';
      const defaultReturn = 'defaultReturn';

      const value = Switch.to(type)
        .case('C1', 1)
        .case('C2', 2)
        .default(defaultReturn);

      expect(value).toBe(1);
    });

    it('should find the case and return the case 2', () => {
      const type = 'C2';
      const defaultReturn = 'defaultReturn';
      const value = Switch.to(type)
        .case('C1', 1)
        .case('C2', { id: 1 })
        .default(defaultReturn);

      expect(value).toEqual({ id: 1 });
    });

    it('should NOT find the case and return default', () => {
      const type = 'C3';
      const defaultReturn = 'defaultReturn';
      const value = Switch.to(type)
        .case('C1', 1)
        .case('C2', { id: 1 })
        .default(defaultReturn);

      expect(value).toEqual(defaultReturn);
    });
  });
});
