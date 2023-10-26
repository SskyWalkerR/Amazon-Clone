import { ProductDocument } from "../../models/product/product";

import { globalApi } from "../../services";

export const productApi = globalApi.injectEndpoints({
  endpoints: (builder) => ({
    getProducts: builder.query<ProductDocument[], void>({
      query: () => ({
        url: "/product",
        method: "GET",
      }),
    }),
  }),
  overrideExisting: true,
});

export const { useGetProductsQuery } = productApi;
