export const partialize = (fn, ...args) => fn.bind(null, ...args);

export const compose = (...fns) => value =>
  fns.reduceRight((prevValue, fn) => fn(prevValue), value);

export const pipe = (...fns) => value =>
  fns.reduce((prevValue, fn) => fn(prevValue), value);

export const takeUntil = (times, fn) => () => times -- > 0 && fn();

export const debounceTime = (milliseconds, fn) => {
  let timeoutID = 0;
  return () => {
    clearTimeout(timeoutID);
    timeoutID = setTimeout(fn, milliseconds);
  }
}
