import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { TOKEN, BASE_URL } from '../requestMethods'

export const usersApi = createApi({
  reducerPath: 'usersApi',
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
    prepareHeaders: (headers, {getState}) => {
      const token = getState().user.currentUser?.token;
      if (token) {
        headers.set("token", `Bearer ${TOKEN}`);
      }
      return headers;
    },
  }),
  tagTypes: ['Users'],
  endpoints: (builder) => ({
    getUsers: builder.query({
      query: () => 'users',
      providesTags: ['Users'],
    }),
    updateUser: builder.mutation({
      query: ({ id, body }) => ({
      url: `users/${id}`,
      method: 'PUT',
      body,
    }),
      invalidatesTags: ['Users'],
    }),
    deleteUser: builder.mutation({
      query: (id) => ({
      url: `users/${id}`,
      method: 'DELETE',
      }),
      invalidatesTags: ['Users'],
    }),
    addUser: builder.mutation({
      query: (payload) => ({
      url: `users`,
      method: "POST",
      body: payload,
    }),
      invalidatesTags: ['Users']
    }),
    login: builder.mutation ({
      query: (payload) =>({
        url: `auth/adminAuth`,
        method: "POST",
        body: payload,
      }),
    }),
    logout: builder.mutation ({
      query: (id) => ({
        url: `auth/logout/${user.id}`,
        method: "POST",
      }),
    }),
  }),
});

export const { 
  useGetUsersQuery,
  useUpdateUserMutation,
  useDeleteUserMutation,
  useAddUserMutation,
  useLoginMutation,
  useLogoutMutation,
} = usersApi;