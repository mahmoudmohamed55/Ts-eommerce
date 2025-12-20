import { createAsyncThunk } from "@reduxjs/toolkit";


import axios from "axios";
import axiosErrorHandler from "@utils/axiosErrorHandler";
import type { TProduct } from "@types";

export const actGetProductsByCatPrefix = createAsyncThunk(
  "products/actGetProductsByCatPrefix",
  async (prefix: string, thunkAPI) => {
    const { signal, rejectWithValue } = thunkAPI;
    try {
      const res = await axios.get<TProduct[]>(
        `/products?cat_prefix=${prefix}`,
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
