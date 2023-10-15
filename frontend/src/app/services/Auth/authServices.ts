import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import jwtDecode from "jwt-decode";
import { DecodedJwt, Jwt, LoginUser, NewUser, User } from "../../../types/auth";
import { BaseUrl } from "../../Features";
import { RootState } from "../../store";

export const authApi = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: BaseUrl,
    prepareHeaders: (headers, { getState }) => {
      // By default, if we have a token in the store, let's use that for authenticated requests
      const token = (getState() as RootState).auth.jwt?.access_token;
      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    register: builder.mutation<User, NewUser>({
      query: (credentials) => ({
        url: "/auth/register",
        method: "POST",
        body: credentials,
      }),
    }),
    login: builder.mutation<Jwt, LoginUser>({
      query: (credentials) => ({
        url: "/auth/login",
        method: "POST",
        body: credentials,
      }),
      transformResponse: (response: Jwt) => {
        if (response) {
          localStorage.setItem("jwt", JSON.stringify(response));
        }
        return response;
      },
    }),
    verifyJwt: builder.mutation<any, { jwt: string }>({
      query: (credentials) => ({
        url: "/auth/verify-jwt",
        method: "POST",
        body: credentials,
      }),
      transformResponse: (response: { exp: number }) => {
        if (response) {
          const jwtExpirationMs = response.exp * 1000;
          return jwtExpirationMs > Date.now();
        }
        return false;
      },
    }),
    me: builder.mutation<User, void>({
      query: () => "/users/me",
      transformResponse: (response: User) => {
        localStorage.setItem("user", JSON.stringify(response));
        return response;
      },
    }),
  }),
});

export const { useRegisterMutation, useLoginMutation, useVerifyJwtMutation, useMeMutation } =
  authApi;
