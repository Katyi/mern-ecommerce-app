import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { TOKEN, BASE_URL } from '../requestMethods'

export const productsApi = createApi({
  reducerPath: 'productsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
    prepareHeaders: (headers) => {
      headers.set("token", `Bearer ${TOKEN}`);
      return headers;
    },
  }),
  tagTypes: ['Products'],
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: () => 'products',
      providesTags: ['Products'],
    }),
    updateProduct: builder.mutation({
      query: ({ id, body }) => ({
      url: `products/${id}`,
      method: 'PUT',
      body,
    }),
      invalidatesTags: ['Products'],
    }),
    deleteProduct: builder.mutation({
      query: (id) => ({
      url: `products/${id}`,
      method: 'DELETE',
      }),
      invalidatesTags: ['Products'],
    }),
    addProduct: builder.mutation({
      query: (payload) => ({
      url: `products`,
      method: "POST",
      body: payload,
    }),
      invalidatesTags: ['Products']
    }),
  }),
});

export const { 
  useGetProductsQuery,
  useUpdateProductMutation,
  useDeleteProductMutation,
  useAddProductMutation,
} = productsApi;