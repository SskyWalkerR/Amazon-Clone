import { createApi } from "@reduxjs/toolkit/dist/query/react";
import { fetchBaseQuery } from "@reduxjs/toolkit/query";
import { RootState } from "../store";

const BaseUrl = import.meta.env.VITE_BASE_URL;

const baseQuery = fetchBaseQuery({
  baseUrl: BaseUrl,
  prepareHeaders: (headers, { getState }) => {
    // By default, if we have a token in the store, let's use that for authenticated requests
    const token = (getState() as RootState).auth.jwt?.access_token;
    if (token) {
      headers.set("authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

// initialize an empty api service that we'll inject endpoints into later as needed
const globalApi = createApi({
  baseQuery,
  endpoints: () => ({}),
});

export { BaseUrl, baseQuery, globalApi };
