import { createAsyncThunk } from "@reduxjs/toolkit";
import type { TProduct } from "../../../types/product.types";

import axios from "axios";

export const actGetProductsByCatPrefix = createAsyncThunk(
  "products/actGetProductsByCatPrefix",
  async (prefix: string, thunkAPI) => {
    const { signal, rejectWithValue } = thunkAPI;
    try {
      const res = await axios.get<TProduct[]>(
        `http://localhost:3001/products?cat_prefix=${prefix}`,
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
