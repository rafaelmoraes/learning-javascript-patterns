export const handleResponse = res =>
  res.ok ? res.json() : Promise.reject(`${res.status} - ${res.statusText}`);

export const log = parameter => {
  console.log(parameter);
  return parameter;
}

export const error = parameter => {
  console.error(parameter)
  return parameter;
}

export const info = parameter => {
  console.info(parameter)
  return parameter;
}

export const timeoutPromise = (milliseconds, promise) => {
  const timeout = new Promise((resolve, reject) =>
    setTimeout(
      () => reject(`Time out of ${milliseconds} milliseconds was reached`),
      milliseconds
    )
  );

  return Promise.race([timeout, promise]);
}

export const delay = milliseconds => data =>
  new Promise((resolve, reject) =>
    setTimeout(() => resolve(data), milliseconds));

export const retry = (retries, milliseconds, fnWithPromise) =>
  fnWithPromise()
    .catch(err => {
      error(retries);

      return delay(milliseconds)().then(() =>
        retries > 1
          ? retry(--retries, milliseconds, fnWithPromise)
          : Promise.reject(err)
      );
  });
