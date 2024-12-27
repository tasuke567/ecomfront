import { createSelector } from "@reduxjs/toolkit";

export const selectCart = createSelector(
  state => state.cart,
  cart => cart || { items: [] }
);

export const selectAuth = createSelector(
  state => state.auth,
  auth => auth
);

export const selectUser = createSelector(
  state => state.auth.user,
  user => user
);