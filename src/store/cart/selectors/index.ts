import { createSelector } from "@reduxjs/toolkit";
import type { RootState } from "@store/index";

const totalQuantitySelector = createSelector(
  (state: RootState) => state.cart.items,
  (items) => {
    const count = Object.values(items).reduce(
      (acc, current) => acc + current,
      0
    );
    return count;
  }
);
export { totalQuantitySelector };
