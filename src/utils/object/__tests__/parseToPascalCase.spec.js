import parseToCamel from '../parseToPascalCase';

describe('parseToCamel', () => {
  describe('Simple objects', () => {
    it('should parse a simple object', () => {
      expect(parseToCamel(MOCK1)).toEqual({
        imageUrl: 'https://images.punkapi.com/v2/keg.png',
        abv: 4.5,
        ibu: 60,
        targetFg: 1010,
        targetOg: 1044,
        ebc: 20,
        srmVerySnek: 10,
        ph: 4.4,
        attenuationLevel: 75,
      });
    });

    it('should parse a simple object array', () => {
      expect(parseToCamel(MOCK2)).toEqual({
        imageUrl: 'https://images.punkapi.com/v2/keg.png',
        targetFg: [1, 2, 3],
      });
    });
  });

  describe('Neste Object', () => {
    it('should parse a simple nested', () => {
      const obj = parseToCamel(MOCK3);

      expect(obj).toEqual({
        imageUrl: {
          targetFg: 1010,
          targetOg: 1044,
        },
      });
    });
    it('should parse a complex nested', () => {
      const obj = parseToCamel(MOCK4);

      expect(obj).toEqual(MOCK4_EXPECTATION);
    });

    it('should parse a complex array nested', () => {
      const obj = parseToCamel([MOCK4, MOCK4, MOCK4]);

      expect(obj).toEqual([
        MOCK4_EXPECTATION,
        MOCK4_EXPECTATION,
        MOCK4_EXPECTATION,
      ]);
    });
  });
});

const MOCK1 = {
  image_url: 'https://images.punkapi.com/v2/keg.png',
  abv: 4.5,
  ibu: 60,
  target_fg: 1010,
  target_og: 1044,
  ebc: 20,
  srm_very_snek: 10,
  ph: 4.4,
  attenuation__level: 75,
};

const MOCK2 = {
  image_url: 'https://images.punkapi.com/v2/keg.png',
  target_fg: [1, 2, 3],
};

const MOCK3 = {
  image_url: {
    target_fg: 1010,
    target_og: 1044,
  },
};

const MOCK4 = {
  id: 1,
  srm_very_snek: 10,
  image_url: {
    target_fg: 1010,
    target_og: 1044,
  },
  target_fg: [
    {
      target__fg: 1010,
      attenuation__level: [
        1,
        2,
        3,
        { attenuation__level: { attenuation__level: 1 } },
      ],
    },
    {
      target_fg: 1010,
      target_og: 1044,
    },
  ],
};

const MOCK4_EXPECTATION = {
  id: 1,
  srmVerySnek: 10,
  imageUrl: {
    targetFg: 1010,
    targetOg: 1044,
  },
  targetFg: [
    {
      targetFg: 1010,
      attenuationLevel: [
        1,
        2,
        3,
        { attenuationLevel: { attenuationLevel: 1 } },
      ],
    },
    {
      targetFg: 1010,
      targetOg: 1044,
    },
  ],
};
