import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { TOKEN, BASE_URL } from '../requestMethods'

export const ordersApi = createApi({
  reducerPath: 'ordersApi',
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
    prepareHeaders: (headers) => {
      headers.set("token", `Bearer ${TOKEN}`);
      return headers;
    },
  }),
  tagTypes: ['Orders'],
  endpoints: (builder) => ({
    getOrders: builder.query({
      query: () => 'orders',
      providesTags: ['Orders'],
    }),
    updateOrder: builder.mutation({
      query: ({ id, body }) => ({
      url: `orders/${id}`,
      method: 'PUT',
      body,
    }),
      invalidatesTags: ['Orders'],
    }),
    deleteOrder: builder.mutation({
      query: (id) => ({
      url: `orders/${id}`,
      method: 'DELETE',
      }),
      invalidatesTags: ['Orders'],
    }),
    addOrder: builder.mutation({
      query: (payload) => ({
      url: `orders`,
      method: "POST",
      body: payload,
    }),
      invalidatesTags: ['Orders']
    }),
  }),
});

export const { 
  useGetOrdersQuery,
  useUpdateOrderMutation,
  useDeleteOrderMutation,
  useAddOrderMutation,
} = ordersApi;