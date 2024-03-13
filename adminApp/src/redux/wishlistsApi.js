import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { TOKEN, BASE_URL } from '../requestMethods'

export const wishlistsApi = createApi({
  reducerPath: 'wishlistsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
    prepareHeaders: (headers) => {
      headers.set("token", `Bearer ${TOKEN}`);
      return headers;
    },
  }),
  tagTypes: ['Orders'],
  endpoints: (builder) => ({
    getWishlists: builder.query({
      query: () => 'wishlists',
      providesTags: ['Wishlists'],
    }),
    updateWishlist: builder.mutation({
      query: ({ id, body }) => ({
      url: `wishlists/${id}`,
      method: 'PUT',
      body,
    }),
      invalidatesTags: ['Wishlists'],
    }),
    deleteWishlist: builder.mutation({
      query: (id) => ({
      url: `wishlists/${id}`,
      method: 'DELETE',
      }),
      invalidatesTags: ['Wishlists'],
    }),
    addWishlist: builder.mutation({
      query: (payload) => ({
      url: `wishlists`,
      method: "POST",
      body: payload,
    }),
      invalidatesTags: ['Wishlists']
    }),
  }),
});

export const { 
  useGetWishlistsQuery,
  useUpdateWishlistMutation,
  useDeleteWishlistMutation,
  useAddWishlistMutation,
} = wishlistsApi;