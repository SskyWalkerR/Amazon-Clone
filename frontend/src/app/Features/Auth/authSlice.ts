import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../store";
import { Jwt, LoginUser, NewUser, User } from "../../../types/auth";
import authService from "./services/auth.services";

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

export const register = createAsyncThunk("auth/register", async (newUser: NewUser, thunkAPI) => {
  try {
    return await authService.register(newUser);
  } catch (error) {
    return thunkAPI.rejectWithValue("Unable to register user");
  }
});

export const login = createAsyncThunk("auth/login", async (user: LoginUser, thunkAPI) => {
  try {
    return await authService.login(user);
  } catch (error) {
    return thunkAPI.rejectWithValue("Unable to login");
  }
});

export const logout = createAsyncThunk("auth/logout", async () => {
  return authService.logout();
});

export const verifyJwt = createAsyncThunk("auth/verify-jwt", async (jwt: string, thunkAPI) => {
  try {
    return await authService.verifyJwt(jwt);
  } catch (error) {
    return thunkAPI.rejectWithValue("Unable to verify");
  }
});

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
    },
  },
  extraReducers: (builder) => {
    builder
      // Register
      .addCase(register.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload;
      })
      .addCase(register.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
        state.user = null;
      })
      // Login
      .addCase(login.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.jwt = action.payload;
        state.isAuthenticated = true;
      })
      .addCase(login.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
        state.user = null;
        state.isAuthenticated = false;
      })
      // Logout
      .addCase(logout.fulfilled, (state) => {
        state.user = null;
        state.jwt = null;
        state.isAuthenticated = false;
      })
      // Verify JWT token
      .addCase(verifyJwt.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(verifyJwt.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isAuthenticated = action.payload;
      })
      .addCase(verifyJwt.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
        state.user = null;
        state.isAuthenticated = false;
      });
  },
});

// Action creators are generated for each case reducer function
export const { reset } = authSlice.actions;

export const selectedUser = (state: RootState) => state.auth;

export default authSlice.reducer;
