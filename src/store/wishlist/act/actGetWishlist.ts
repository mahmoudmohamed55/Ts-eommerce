import { createAsyncThunk } from "@reduxjs/toolkit";
import type { RootState } from "@store/index";

import axios from "axios";
import axiosErrorHandler from "@utils/axiosErrorHandler";
import type { TProduct } from "@types";
type TDataType = "productsFullInfo" | "ProductIds";
type TResponse = TProduct[];
const actGetWishlist = createAsyncThunk(
  "wishlist/actGetWishlist",
  async (type: TDataType, thunkAPI) => {
    const { rejectWithValue, fulfillWithValue, signal, getState } = thunkAPI;
    const { auth } = getState() as RootState;
    try {
      const userWishlist = await axios.get<{ productId: number }[]>(
        `/wishlist?userId=${auth.user?.id}`,
        { signal }
      );

      if (userWishlist.data.length === 0) {
        return fulfillWithValue({ data: [], type });
      }
      if (type === "ProductIds") {
        const concatenatedItemsId = userWishlist.data.map((el) => el.productId);
        return { data: concatenatedItemsId, type: "ProductIds" };
      } else {
        const concatenatedItemsId = userWishlist.data
          .map((el) => `id=${el.productId}`)
          .join("&");

        const res = await axios.get<TResponse>(
          `/products?${concatenatedItemsId}`,
          {
            signal,
          }
        );

        return { data: res.data, type: "productsFullInfo" };
      }
    } catch (error) {
      return rejectWithValue(axiosErrorHandler(error));
    }
  }
);
export default actGetWishlist;
