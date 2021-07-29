const manyUnderlinesReg = new RegExp(/__*/g);
const underFollowedByCharReg = new RegExp(/_(\w)/g);
const underlineAtEndReg = new RegExp(/_$/g);

const toCamelCase = word =>
  word
    .replace(manyUnderlinesReg, '_')
    .replace(underFollowedByCharReg, x => x.toUpperCase())
    .replace(underFollowedByCharReg, '$1')
    .replace(underlineAtEndReg, '');

const objectPropertyNames = object => Object.getOwnPropertyNames(object);

const isObject = object => object && typeof object === 'object';

const copyProp = (originObject, targetObject) => prop =>
  (targetObject[toCamelCase(prop)] = deepCopyToCamelCase(originObject[prop]));

const deepCopyToCamelCase = object => {
  if (isObject(object)) {
    const camelCaseObject = new object.constructor();

    objectPropertyNames(object).forEach(copyProp(object, camelCaseObject));

    return camelCaseObject;
  }

  return object;
};

export default deepCopyToCamelCase;
