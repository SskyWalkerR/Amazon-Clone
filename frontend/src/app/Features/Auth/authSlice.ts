import { createSlice } from "@reduxjs/toolkit";

import { Jwt, User } from "../../models/auth";
import { authApi } from "../../services/Auth/authServices";
import { RootState } from "../../store";

const storedUser: string | null = localStorage.getItem("user");
const user: User | null = !!storedUser ? JSON.parse(storedUser) : null;

const storedJwt: string | null = localStorage.getItem("jwt");
const jwt: Jwt | null = !!storedJwt ? JSON.parse(storedJwt) : null;

type AuthState = { user?: User | null; jwt?: Jwt };

const initialState: AuthState = {
  user,
  jwt,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.jwt = null;
      localStorage.removeItem("user");
      localStorage.removeItem("jwt");
    },
  },
  extraReducers: (builder) => {
    builder
      // Login
      .addMatcher(authApi.endpoints.login.matchFulfilled, (state, { payload }) => {
        state.jwt = payload;
      })
      // Me
      .addMatcher(authApi.endpoints.me.matchFulfilled, (state, { payload }) => {
        state.user = payload;
      })
      .addMatcher(authApi.endpoints.me.matchRejected, (state) => {
        state.user = null;
      });
  },
});

// Action creators are generated for each case reducer function
export const { logout } = authSlice.actions;

export const selectCurrentUser = (state: RootState) => state.auth.user;

export default authSlice.reducer;
