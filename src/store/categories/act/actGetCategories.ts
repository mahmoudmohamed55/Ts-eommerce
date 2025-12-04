import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
type TResponse = {
  id: number;
  title: string;
  prefix: string;
  img: string;
}[];
const actGetCategories = createAsyncThunk(
  "categories/actGetCategories",
  async (_, thunkAPI) => {
    const { rejectWithValue, signal } = thunkAPI;
    try {
      const res = await axios.get<TResponse>("http://localhost:3001/category", {
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
