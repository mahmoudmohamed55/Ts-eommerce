import { createAsyncThunk } from "@reduxjs/toolkit";
import type { RootState } from "@store/index";
import axios from "axios";
import axiosErrorHandler from "@utils/axiosErrorHandler";
import type { TProduct } from "@types";
type TResponse = TProduct[];
export const actGetProductsByItems = createAsyncThunk(
  "cart/actGetProductsByItems",
  async (_, thunkAPI) => {
    const { rejectWithValue, fulfillWithValue, getState, signal } = thunkAPI;
    const { cart } = getState() as RootState;

    const itemsId = Object.keys(cart.items);
    if (itemsId.length === 0) {
      return fulfillWithValue([]);
    }
    try {
      const concatenatedItemsId = itemsId.map((el) => `id=${el}`).join("&");

      const res = await axios.get<TResponse>(
        `/products?${concatenatedItemsId}`,
        {
          signal,
        }
      );

      return res.data;
    } catch (error) {
      return rejectWithValue(axiosErrorHandler(error));
    }
  }
);
