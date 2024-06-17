import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { loginFirebase } from "../../api";
import LoginSliceProps from "../../models/slices/loginSlicePros";
import Cookies from "universal-cookie";
import { FirebaseResponse } from "@types/models";

interface userProps {
  email: string;
  password: string;
}

export const login = createAsyncThunk(
  "login/login",
  async (user: userProps) => {
    const response = await loginFirebase(user.email, user.password);
    console.log("response", response);
    return response._tokenResponse;
  },
);

const cookie = new Cookies();

const initialState: LoginSliceProps = {
  user: { email: "", password: "" },
  loading: false,
  isLoggedIn: cookie.get("loginInfo")?.isLoggedIn ? true : false,
  idToken: cookie.get("loginInfo")?.idToken || "",
  refreshToken: cookie.get("loginInfo")?.refreshToken || "",
  expiresIn: cookie.get("loginInfo")?.expiresIn || 0,
};

const loginSlice = createSlice({
  name: "login",
  initialState: initialState,
  reducers: {
    setEmail: (state: LoginSliceProps, action: { payload: string }) => {
      state.user.email = action.payload;
    },
    setPassword: (state: LoginSliceProps, action: { payload: string }) => {
      state.user.password = action.payload;
    },
    logout: (state: LoginSliceProps) => {
      state.isLoggedIn = false;
    },
    setLoginInfo: (
      state: LoginSliceProps,
      action: { payload: LoginSliceProps },
    ) => {
      state.idToken = action.payload.idToken;
      state.refreshToken = action.payload.refreshToken;
      state.expiresIn = action.payload.expiresIn;
      state.user = action.payload.user;
      state.isLoggedIn = true;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(login.pending, (state: LoginSliceProps) => {
      state.loading = true;
    });
    builder.addCase(
      login.fulfilled,
      (state: LoginSliceProps, action: { payload: any }) => {
        state.loading = false;
        state.isLoggedIn = true;
        state.idToken = action.payload.idToken;
        state.refreshToken = action.payload.refreshToken;
        state.expiresIn = action.payload.expiresIn;
        cookie.set("loginInfo", {
          idToken: action.payload.idToken,
          refreshToken: action.payload.refreshToken,
          expiresIn: action.payload.expiresIn,
          user: state.user,
        });
      },
    );
    builder.addCase(login.rejected, (state: LoginSliceProps) => {
      state.loading = false;
    });
  },
});

export const { setEmail, setPassword, logout, setLoginInfo } =
  loginSlice.actions;

export default loginSlice.reducer;
