if (!Array.prototype.$flatMap) {
  Array.prototype.$flatMap = function (callback) {
    return this
      .map(callback)
      .reduce(((flattened, array) => flattened.concat(array)), []);
  }
}
