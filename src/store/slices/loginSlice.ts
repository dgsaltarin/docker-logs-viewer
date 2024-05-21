import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { loginFirebase } from "../../api";

interface loginSliceProps {
  email: string;
  password: string;
  loading: boolean;
}

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

const initialState: loginSliceProps = {
  email: "",
  password: "",
  loading: false,
};

const loginSlice = createSlice({
  name: "login",
  initialState: initialState,
  reducers: {
    setEmail: (state: loginSliceProps, action: { payload: string }) => {
      state.email = action.payload;
    },
    setPassword: (state: loginSliceProps, action: { payload: string }) => {
      state.password = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(login.pending, (state: loginSliceProps) => {
      state.loading = true;
    });
    builder.addCase(login.fulfilled, (state: loginSliceProps) => {
      state.loading = false;
    });
    builder.addCase(login.rejected, (state: loginSliceProps) => {
      state.loading = false;
    });
  },
});

export const { setEmail, setPassword } = loginSlice.actions;

export default loginSlice.reducer;
