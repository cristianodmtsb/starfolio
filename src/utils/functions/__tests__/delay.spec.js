import pipe from '../pipe';

describe('pipe', () => {
  describe('when chain some functions', () => {
    it('should call function "a" with the return of function "b"', () => {
      const functionA = data => data.id;
      const functionB = value => value * 2;

      const param = { id: 10 };

      const result = pipe(
        functionA,
        functionB
      )(param);

      expect(result).toBe(20);
    });

    describe('When a function dont has a return ', () => {
      it('should return undefined in the end of pipe', () => {
        const functionA = data => data.id;
        const functionWithNoReturn = value => {
          value * 2;
        };

        const param = { id: 10 };

        const result = pipe(
          functionA,
          functionWithNoReturn
        )(param);

        expect(result).toBe(undefined);
      });
    });
  });
});
