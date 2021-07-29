const isObject = (data) => typeof data === 'object';

const removeTrailingSpaces = (item = '') => item.trimEnd().trimStart();

const splitToArray = (stringValue, reg) => {
  if (!stringValue) {
    return [];
  }

  return stringValue.split(reg);
};

const cookieToArray = (cookie) => {
  const re = /\s*;\s*/;
  return splitToArray(cookie, re);
};

const buildCookieObject = (cookie) => ({ [cookie[0]]: cookie[1] });

const buildCookie = (cookie) => {
  const re = /=/;
  const cookieArray = splitToArray(cookie, re);
  return buildCookieObject(cookieArray);
};

const flatTokenData = (a, t) => ({ ...t, ...a });

const updateDocumentCookies = (doc, cookiesData) => {
  if (!doc) {
    throw Error('The document instance mus be infomed');
  }

  Object.getOwnPropertyNames(cookiesData).forEach((key) => {
    const value = cookiesData[key];
    const cookie = typeof value === 'object' ? JSON.stringify(value) : value;
    doc.cookie = `${key}=${cookie};path=/ `;
  });
};

const cleanDocCookies = (cookiesDataObj) => {
  return Object.getOwnPropertyNames(cookiesDataObj).join(' ');
};

class CookieService {
  static instance;
  static COOKIES_DATA;

  constructor() {
    if (this.instance) {
      return this.instance;
    }

    this.instance = this;

    this.init(document);

    return this.instance;
  }

  init = (doc = document) => {
    if (doc) {
      this.COOKIES_DATA = this._setCookiesData(doc.cookie);
    }
  };

  exec = (params) => {
    const { method, key, data } = params;

    if (!params || !method || !this[method.toLowerCase()]) {
      throw new Error('CookieServise method not found');
    }

    return this[method.toLowerCase()]({ key, data });
  };

  delete = ({ key }, doc = document) => {
    this.set({ key, data: '' }, doc);
  };

  set = ({ key, data }, doc = document) => {
    if (!key) {
      return;
    }

    this.COOKIES_DATA[key] = data;

    updateDocumentCookies(doc, this.COOKIES_DATA);
  };

  update = ({ key, data }, doc = document) => {
    if (!key) {
      return;
    }

    const editingCookie = this.COOKIES_DATA[key];

    if (isObject(editingCookie) && isObject(data)) {
      this.COOKIES_DATA[key] = { ...editingCookie, ...data };
    } else {
      this.COOKIES_DATA[key] = data;
    }

    updateDocumentCookies(doc, this.COOKIES_DATA);
  };

  get = (params = {}) => {
    const { key } = params;

    if (!key) {
      return { ...this.COOKIES_DATA };
    }

    return this.COOKIES_DATA[key];
  };

  _setCookiesData(cookie) {
    if (!cookie) {
      return {};
    }

    return cookieToArray(cookie)
      .map(removeTrailingSpaces)
      .map(buildCookie)
      .reduce(flatTokenData, {});
  }

  clean = (doc = document) => {
    if (!doc) return;
    doc.cookie = cleanDocCookies(this.COOKIES_DATA);
  };
}

export default new CookieService();
