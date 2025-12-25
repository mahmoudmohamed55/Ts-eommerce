import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosErrorHandler from "@utils/axiosErrorHandler";
import axios from "axios";
type TFormData = {
  email: string;
  password: string;
};
type TResponseData = {
  user: {
    id: number;
    email: string;
    firstName: string;
    lastName: string;
  };
  accessToken: string;
};
const actAuthLogin = createAsyncThunk(
  "auth/actAuthLogin",
  async (formData: TFormData, thunk) => {
    const { rejectWithValue } = thunk;
    try {
      const res = await axios.post<TResponseData>("/login", formData);
      console.log(res.data);
      return res.data;
    } catch (error) {
      console.log(error);

      return rejectWithValue(axiosErrorHandler(error));
    }
  }
);
export default actAuthLogin;
