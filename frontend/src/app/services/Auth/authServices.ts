import { globalApi } from "../../services";
import { Jwt, LoginUser, NewUser, User } from "../../models/auth";

export const authApi = globalApi.injectEndpoints({
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
    verifyJwt: builder.mutation<boolean, { jwt: string }>({
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
