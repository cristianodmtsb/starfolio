/* eslint-disable no-undef */
const KEY = Symbol('key');
const ARGS = Symbol('args');
const VALUE = Symbol('value');
const DONE = Symbol('done');

class Switch {
  constructor(key, args) {
    this[KEY] = key;
    this[ARGS] = args;
  }

  static to(key, ...args) {
    return new Switch(key, args);
  }

  static of(key, ...args) {
    return new Switch(key, args);
  }

  static on(key, ...args) {
    return new Switch(key, args);
  }

  case(caseValue, fn) {
    //imediate return if the switch case is already solved (DONE)
    if (this[DONE]) {
      return this;
    }

    if (caseValue === this[KEY]) {
      this[DONE] = true;

      if (typeof fn === 'function') {
        this[VALUE] = fn(...this[ARGS]);
      } else {
        this[VALUE] = fn;
      }
    }

    return this;
  }

  default(value) {
    if (this[DONE]) {
      return this[VALUE];
    }

    this[VALUE] = value;
    return this[VALUE];
  }

  key() {
    return this[KEY];
  }

  get() {
    return this[VALUE];
  }
}

export default Switch;
