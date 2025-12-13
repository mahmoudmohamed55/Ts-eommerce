import { createSlice } from "@reduxjs/toolkit";
import type { TProduct } from "../../types/product.types";
import type { TLoading } from "../../types/shared.types";
import actLikeToggle from "./act/actLikeToggle";
interface IWishlist {
  itemsId: number[];
  productsFullInfo: TProduct[];
  error: string | null;
  loading: TLoading;
}

const initialState: IWishlist = {
  itemsId: [],
  productsFullInfo: [],
  error: null,
  loading: "idle",
};
const wishlistSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(actLikeToggle.pending, (state) => {
      state.loading = "pending";
      state.error = null;
    });
    builder.addCase(actLikeToggle.fulfilled, (state, action) => {
      if (action.payload.type === "add") {
        state.itemsId.push(action.payload.id);
      } else {
        state.itemsId = state.itemsId.filter((el) => el !== action.payload.id);
      }
    });
    builder.addCase(actLikeToggle.rejected, (state, action) => {
      if (action.payload && typeof action.payload === "string") {
        state.error = action.payload;
      }
    });
  },
});
export { actLikeToggle };
export default wishlistSlice.reducer;
