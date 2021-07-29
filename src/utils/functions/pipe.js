export default (...fns) =>
  fns.reduce((result, f) => (...args) => f(result(...args)));
