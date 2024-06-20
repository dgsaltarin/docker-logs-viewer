import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { loginFirebase } from "@api/index";
import LoginSliceProps from "@models/slices/loginSlicePros";
import {
  UserCredential,
  getAuth,
  setPersistence,
  browserLocalPersistence,
  User,
} from "firebase/auth";

interface userProps {
  email: string;
  password: string;
}

export const login = createAsyncThunk(
  "login/login",
  async (user: userProps) => {
    const response: UserCredential = await loginFirebase(
      user.email,
      user.password,
    );
    return response;
  },
);

const initialState: LoginSliceProps = {
  user: { email: "" },
  loading: false,
  isLoggedIn: false,
};

const loginSlice = createSlice({
  name: "login",
  initialState: initialState,
  reducers: {
    setEmail: (state: LoginSliceProps, action: { payload: string }) => {
      state.user.email = action.payload;
    },
    logout: (state: LoginSliceProps) => {
      localStorage.clear();
      state.isLoggedIn = false;
    },
    setLoginInfo: (state: LoginSliceProps, action: { payload: User }) => {
      state.user.email = action.payload.email;
      state.isLoggedIn = true;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(login.pending, (state: LoginSliceProps) => {
      state.loading = true;
    });
    builder.addCase(login.fulfilled, (state: LoginSliceProps) => {
      state.loading = false;
      state.isLoggedIn = true;
      const auth = getAuth();
      setPersistence(auth, browserLocalPersistence);
    });
    builder.addCase(login.rejected, (state: LoginSliceProps) => {
      state.loading = false;
    });
  },
});

export const { setEmail, logout, setLoginInfo } = loginSlice.actions;

export default loginSlice.reducer;
