export default (...fns) =>
  fns.reduce((result, f) => (...args) => result(f(...args)));
