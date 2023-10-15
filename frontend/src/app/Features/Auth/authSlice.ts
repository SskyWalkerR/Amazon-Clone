import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../store";
import { Jwt, User } from "../../../types/auth";
import { authApi } from "../../services/Auth/authServices";

const storedUser: string | null = localStorage.getItem("user");
const user: User | null = !!storedUser ? JSON.parse(storedUser) : null;

const storedJwt: string | null = localStorage.getItem("jwt");
const jwt: Jwt | null = !!storedJwt ? JSON.parse(storedJwt) : null;

type AsyncState = {
  isLoading: boolean;
  isSuccess: boolean;
  isError: boolean;
};

type AuthState = { user?: User | null; jwt?: Jwt; isAuthenticated: boolean } & AsyncState;

const initialState: AuthState = {
  user,
  jwt,
  isLoading: false,
  isError: false,
  isSuccess: false,
  isAuthenticated: false,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
    },
    logout: (state) => {
      state.user = null;
      state.jwt = null;
      state.isAuthenticated = false;
      localStorage.removeItem("user");
      localStorage.removeItem("jwt");
    },
  },
  extraReducers: (builder) => {
    builder
      // Register
      .addMatcher(authApi.endpoints.register.matchPending, (state) => {
        state.isLoading = true;
      })
      .addMatcher(authApi.endpoints.register.matchFulfilled, (state) => {
        state.isLoading = false;
        state.isSuccess = true;
      })
      .addMatcher(authApi.endpoints.register.matchRejected, (state) => {
        state.isLoading = false;
        state.isError = true;
        state.user = null;
      })
      // Login
      .addMatcher(authApi.endpoints.login.matchPending, (state) => {
        state.isLoading = true;
      })
      .addMatcher(authApi.endpoints.login.matchFulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.jwt = payload;
        state.isAuthenticated = true;
      })
      .addMatcher(authApi.endpoints.login.matchRejected, (state) => {
        state.isLoading = false;
        state.isError = true;
        state.user = null;
        state.isAuthenticated = false;
      })
      // Verify JWT token
      .addMatcher(authApi.endpoints.verifyJwt.matchPending, (state) => {
        state.isLoading = true;
      })
      .addMatcher(authApi.endpoints.verifyJwt.matchFulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isAuthenticated = payload;
      })
      .addMatcher(authApi.endpoints.verifyJwt.matchRejected, (state) => {
        state.isLoading = false;
        state.isError = true;
        state.user = null;
        state.isAuthenticated = false;
      })
      // Me
      .addMatcher(authApi.endpoints.me.matchFulfilled, (state, { payload }) => {
        state.user = payload;
        state.isAuthenticated = true;
      })
      .addMatcher(authApi.endpoints.me.matchRejected, (state) => {
        state.user = null;
        state.isAuthenticated = false;
      });
  },
});

// Action creators are generated for each case reducer function
export const { reset, logout } = authSlice.actions;

export const selectCurrentUser = (state: RootState) => state.auth.user;

export default authSlice.reducer;
