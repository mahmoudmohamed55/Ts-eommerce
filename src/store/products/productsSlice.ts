import { createSlice } from "@reduxjs/toolkit";
import { isString, type TLoading, type TProduct } from "@types";
import { actGetProductsByCatPrefix } from "./act/actGetProductsByCatPrefix";

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

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    productsCleanUp: (state) => {
      state.records = [];
    },
  },
  extraReducers(builder) {
    builder.addCase(actGetProductsByCatPrefix.pending, (state) => {
      state.loading = "pending";
      state.error = null;
    });
    builder.addCase(actGetProductsByCatPrefix.fulfilled, (state, action) => {
      state.loading = "succeeded";
      state.records = action.payload;
    });
    builder.addCase(actGetProductsByCatPrefix.rejected, (state, action) => {
      state.loading = "failed";
      if (isString(action.payload)) {
        state.error = action.payload;
      }
    });
  },
});
export default productsSlice.reducer;
export const { productsCleanUp } = productsSlice.actions;
