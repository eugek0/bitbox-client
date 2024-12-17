import { createApi } from "@reduxjs/toolkit/query/react";
import fetchMainBaseQuery from "../rtkquery";
import { IProfile } from "@/containers/Auth/types";

export const usersApi = createApi({
  reducerPath: "users/api",
  baseQuery: fetchMainBaseQuery("/users"),
  endpoints: (builder) => ({
    getUserList: builder.query<IProfile[], void>({
      query: () => "/list",
    }),
  }),
});

export const { useGetUserListQuery } = usersApi;
