import { createSlice } from "@reduxjs/toolkit";

import type { TLoading } from "../../../types/shared.types";

import type { TProduct } from "../../../types/product.types";
import { actGetallProducts } from "./allproductsact";

interface IProductsState {
  records: TProduct[];
  loading: TLoading;
  error: string | null;
}
const initialState: IProductsState = {
  records: [],
  loading: "idle",
  error: null,
};

const AllProductsSlice = createSlice({
  name: "allProducts",
  initialState,
  reducers: {
    productsCleanUp: (state) => {
      state.records = [];
    },
  },
  extraReducers(builder) {
    builder.addCase(actGetallProducts.pending, (state) => {
      state.loading = "pending";
      state.error = null;
    });
    builder.addCase(actGetallProducts.fulfilled, (state, action) => {
      state.loading = "succeeded";
      state.records = action.payload;
    });
    builder.addCase(actGetallProducts.rejected, (state, action) => {
      state.loading = "failed";
      if (action.payload && typeof action.payload === "string") {
        state.error = action.payload;
      }
    });
  },
});
export default AllProductsSlice.reducer;
export const { productsCleanUp } = AllProductsSlice.actions;
