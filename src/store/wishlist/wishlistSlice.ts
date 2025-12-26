import { createSlice } from "@reduxjs/toolkit";
import { type TProduct, type TLoading, isString } from "@types";
import actLikeToggle from "./act/actLikeToggle";
import actGetWishlist from "./act/actGetWishlist";
import { authLogout } from "@store/auth/authSlice";
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
  reducers: {
    wishlistCleanUp: (state) => {
      state.productsFullInfo = [];
    },
  },
  extraReducers(builder) {
    builder.addCase(actLikeToggle.pending, (state) => {
      state.error = null;
    });

    builder.addCase(actLikeToggle.fulfilled, (state, action) => {
      if (action.payload.type === "add") {
        state.itemsId.push(action.payload.id);
      } else {
        state.itemsId = state.itemsId.filter((el) => el !== action.payload.id);
        state.productsFullInfo = state.productsFullInfo.filter(
          (el) => el.id !== action.payload.id
        );
      }
    });

    builder.addCase(actLikeToggle.rejected, (state, action) => {
      if (isString(action.payload)) {
        state.error = action.payload;
      }
    });

    // Get Wishlist

    {
      builder.addCase(actGetWishlist.pending, (state) => {
        state.loading = "pending";
        state.error = null;
      });
      builder.addCase(actGetWishlist.fulfilled, (state, action) => {
        state.loading = "succeeded";

        if (action.payload.type === "productsFullInfo") {
          state.productsFullInfo = action.payload.data as TProduct[];
        } else if (action.payload.type === "ProductIds") {
          state.itemsId = action.payload.data as number[];
        }
      });
      builder.addCase(actGetWishlist.rejected, (state, action) => {
        state.loading = "failed";
        if (isString(action.payload)) {
          state.error = action.payload;
        }
      });
    }
    builder.addCase(authLogout, (state) => {
      state.itemsId = [];
      state.productsFullInfo = [];
      state.loading = "idle";
      state.error = null;
    });
  },
});
export { actLikeToggle, actGetWishlist };
export const { wishlistCleanUp } = wishlistSlice.actions;
export default wishlistSlice.reducer;
