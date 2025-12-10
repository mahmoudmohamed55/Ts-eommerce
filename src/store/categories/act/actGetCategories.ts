import { createAsyncThunk } from "@reduxjs/toolkit";
import type { TCategory } from "../../../types/category.types";
import axios from "axios";
type TResponse = TCategory[];
const actGetCategories = createAsyncThunk(
  "categories/actGetCategories",
  async (_, thunkAPI) => {
    const { rejectWithValue, signal } = thunkAPI;
    try {
      const res = await axios.get<TResponse>("/category", {
        signal,
      });
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
export default actGetCategories;
