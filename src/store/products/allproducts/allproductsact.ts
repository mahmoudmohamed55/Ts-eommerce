import { createAsyncThunk } from "@reduxjs/toolkit";
import type { TProduct } from "../../../types/product.types";

import axios from "axios";

export const actGetallProducts = createAsyncThunk(
  "allProducts/actGetallProducts",
  async (__, thunkAPI) => {
    const { signal, rejectWithValue } = thunkAPI;
    try {
      const res = await axios.get<TProduct[]>(
        `/products`,
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
