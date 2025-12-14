import { createAsyncThunk } from "@reduxjs/toolkit";
import type { RootState } from "@store/index";
import type { TProduct } from "../../../types/product.types";
import axios from "axios";
type TResponse = TProduct[];
const actGetWishlist = createAsyncThunk(
  "wishlist/actGetWishlist",
  async (_, thunkAPI) => {
    const { rejectWithValue, fulfillWithValue, signal, getState } = thunkAPI;
    const { wishlist } = getState() as RootState;
    const itemsId = Object.values(wishlist.itemsId);
   
    try {
      const userWishlist = await axios.get<{ productId: number }[]>(
        `/wishlist?userId=1`,
        { signal }
      );
     

      if (userWishlist.data.length === 0) {
        return fulfillWithValue([]);
      }

      const concatenatedItemsId = itemsId.map((el) => `id=${el}`).join("&");
      

      const res = await axios.get<TResponse>(
        `/products?${concatenatedItemsId}`,
        {
          signal,
        }
      );
      

      return res.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(error.response?.data.message || error.message);
      } else {
        return rejectWithValue("An Unexpected Error");
      }
    }
  }
);
export default actGetWishlist;
