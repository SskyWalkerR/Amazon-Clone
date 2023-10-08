import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Jwt, NewUser, User } from "../../types/auth";
import authService from "./services/auth.services";

type AsyncState = {
  isLoading: boolean;
  isSuccess: boolean;
  isError: boolean;
};

type AuthState = { user?: User | null; jwt?: Jwt; isAuthenticated: boolean } & AsyncState;

const initialState: AuthState = {
  user: null,
  jwt: null,
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

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
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
      });
  },
});

// Action creators are generated for each case reducer function
// export const { increment, decrement, incrementByAmount } = authSlice.actions;

export default authSlice.reducer;
