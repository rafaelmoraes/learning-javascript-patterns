import './utils/array-helpers.js';

import {
  error,
  log,
  timeoutPromise,
  retry
} from './utils/promise-helpers.js';

import {
  invoiceService as service
} from "./invoice/service.js";

import {
  pipe,
  partialize,
  takeUntil,
  debounceTime
} from './utils/operators.js';

import { EventEmitter } from "./utils/event-emitter.js";

import { Maybe } from "./utils/maybe.js";

const operations = pipe(
  partialize(takeUntil, 3),
  partialize(debounceTime, 500)
);

const action = operations(() => {
  const targetItemCode = '2143';
  retry(3, 3000, () => timeoutPromise(600, service.sumItems(targetItemCode)))
    .then(total => EventEmitter.emit('total-calculated', total))
    .catch(error);
});

document.querySelector('#myButton').onclick = action;
