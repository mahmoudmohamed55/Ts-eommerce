import { createSlice } from "@reduxjs/toolkit";
import type { TProduct } from "../../types/product.types";
import { actGetProductsByItems } from "./act/actGetProductsByItems";
import type { TLoading } from "../../types/shared.types";
interface ICartState {
  items: { [key: string]: number };
  productsFullInfo: TProduct[];
  loading: TLoading;
  error: null | string;
}

const initialState: ICartState = {
  items: {},
  productsFullInfo: [],
  loading: "idle",
  error: null,
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
    cartItemChangeQuantity: (state, action) => {
      const { id, quantity } = action.payload;
      state.items[id] = quantity;
    },
    cartItemRemove: (state, action) => {
      delete state.items[action.payload];
      state.productsFullInfo = state.productsFullInfo.filter(
        (el) => el.id !== action.payload
      );
    },
    cartCleanUp: (state) => {
      state.productsFullInfo = [];
    },
  },
  extraReducers(builder) {
    builder.addCase(actGetProductsByItems.pending, (state) => {
      state.loading = "pending";
      state.error = null;
    });
    builder.addCase(actGetProductsByItems.fulfilled, (state, action) => {
      state.loading = "succeeded";
      state.productsFullInfo = action.payload;
    });
    builder.addCase(actGetProductsByItems.rejected, (state, action) => {
      state.loading = "failed";
      if (action.payload && typeof action.payload === "string") {
        state.error = action.payload;
      }
    });
  },
});
export { actGetProductsByItems };
export const {
  addToCart,
  cartItemChangeQuantity,
  cartItemRemove,
  cartCleanUp,
} = cartSlice.actions;
export default cartSlice.reducer;
