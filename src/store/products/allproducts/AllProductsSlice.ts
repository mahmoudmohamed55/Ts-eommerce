import { createSlice } from "@reduxjs/toolkit";

import { actGetallProducts } from "./allproductsact";
import { isString, type TLoading, type TProduct } from "@types";

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
    allProductsCleanUp(state) {
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
      if (isString(action.payload)) {
        state.error = action.payload;
      }
    });
  },
});
export const { allProductsCleanUp } = AllProductsSlice.actions;
export default AllProductsSlice.reducer;
