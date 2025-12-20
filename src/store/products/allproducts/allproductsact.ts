import { createAsyncThunk } from "@reduxjs/toolkit";


import axios from "axios";
import axiosErrorHandler from "@utils/axiosErrorHandler";
import type { TProduct } from "@types";

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
      return rejectWithValue(axiosErrorHandler(error));
    }
  }
);
