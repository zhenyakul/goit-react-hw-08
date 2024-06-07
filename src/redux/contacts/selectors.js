import { selectFilter } from "../filters/selectors";
import { createSelector } from "@reduxjs/toolkit";

export const selectItems = (state) => state.contacts;

export const selectFilteredContacts = createSelector(
  [selectItems, selectFilter],
  (items, filter) => {
    return items.contacts.filter((item) => {
      return item.name.toLowerCase().includes(filter.toLowerCase());
    });
  }
);
