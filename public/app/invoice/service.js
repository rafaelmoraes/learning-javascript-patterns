import {
  handleResponse,
  error
} from "../utils/promise-helpers.js";

import {
  partialize,
  pipe
} from '../utils/operators.js';
import { Maybe } from "../utils/maybe.js";

const URL = 'http://localhost:3000/invoices';

const getItemsFromInvoices = invoicesM =>
  invoicesM.map(invoices => invoices.$flatMap(invoice => invoice.items));

const filterItemsByCode = (code, itemsM) =>
  itemsM.map(items => items.filter(item => item.code == code));

const sumItemsValue = itemsM =>
  itemsM.map(items => items.reduce(((total, item) => total + item.amount), 0));

export const invoiceService = {
  all() {
    return fetch(URL)
      .then(handleResponse)
      .then(invoices => Maybe.of(invoices))
      .catch(err => {
        error(err);
        return Promise.reject("Could not connect to HTTP server");
      });
  },

  sumItems(code) {
    const filterItems = partialize(filterItemsByCode, code);
    const sumItems = pipe(
      getItemsFromInvoices,
      filterItems,
      sumItemsValue
    );

    return this.all()
      .then(sumItems)
      .then(result => result.getOrElse(0));
  }
}
