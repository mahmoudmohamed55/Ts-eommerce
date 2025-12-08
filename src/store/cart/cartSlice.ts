import { createSlice } from "@reduxjs/toolkit";
import type { TProduct } from "../../types/product.types";

interface ICartState {
  items: { [key: number]: number };
  productsFullInfo: TProduct[];
}

const initialState: ICartState = {
  items: {},
  productsFullInfo: [],
};
const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const id = action.payload;
      if (state.items[id]) {
        state.items[id]++;
      } else {
        state.items[id] = 1;
      }
    },
  },
});

export const { addToCart } = cartSlice.actions;
export default cartSlice.reducer;
