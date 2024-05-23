import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { loginFirebase } from "../../api";
import { LoginSliceProps } from "../../models/slices/loginSlicePros";

interface userProps {
  email: string;
  password: string;
}

export const login = createAsyncThunk(
  "login/login",
  async (user: userProps) => {
    const response = await loginFirebase(user.email, user.password);
    return response;
  },
);

const initialState: LoginSliceProps = {
  email: "",
  password: "",
  loading: false,
  isLoggedIn: false,
};

const loginSlice = createSlice({
  name: "login",
  initialState: initialState,
  reducers: {
    setEmail: (state: LoginSliceProps, action: { payload: string }) => {
      state.email = action.payload;
    },
    setPassword: (state: LoginSliceProps, action: { payload: string }) => {
      state.password = action.payload;
    },
    logout: (state: LoginSliceProps) => {
      state.isLoggedIn = false;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(login.pending, (state: LoginSliceProps) => {
      state.loading = true;
    });
    builder.addCase(login.fulfilled, (state: LoginSliceProps) => {
      state.loading = false;
      state.isLoggedIn = true;
    });
    builder.addCase(login.rejected, (state: LoginSliceProps) => {
      state.loading = false;
    });
  },
});

export const { setEmail, setPassword, logout } = loginSlice.actions;

export default loginSlice.reducer;
