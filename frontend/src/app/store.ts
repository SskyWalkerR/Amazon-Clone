import { configureStore } from "@reduxjs/toolkit";

import authReducer from "./Features/Auth/authSlice";
import { globalApi } from "./services";
import { authApi } from "./services/Auth/authServices";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    // [authApi.reducerPath]: authApi.reducer,
    [globalApi.reducerPath]: globalApi.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(globalApi.middleware),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
