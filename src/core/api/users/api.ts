import fetchMainBaseQuery from "@/core/rtkquery";
import { createApi } from "@reduxjs/toolkit/query/react";
import { IGetUserPayload } from "./types";
import { IProfile } from "@/containers/Auth/types";
import { DefaultOptionType } from "antd/es/select";

export const usersApi = createApi({
  reducerPath: "users/api",
  baseQuery: fetchMainBaseQuery("/users"),
  endpoints: (builder) => ({
    getUser: builder.query<IProfile, IGetUserPayload>({
      query: (params) => ({
        url: "/",
        params,
      }),
    }),

    getUsersOptions: builder.query<DefaultOptionType[], void>({
      query: () => ({
        url: "/options",
      }),
    }),

    getUsersRecord: builder.query<Record<string, IProfile>, void>({
      query: () => ({
        url: "/record",
      }),
    }),
  }),
});

export const {
  useGetUserQuery,
  useGetUsersOptionsQuery,
  useGetUsersRecordQuery,
} = usersApi;
