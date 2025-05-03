import fetchMainBaseQuery from "@/core/rtkquery";
import { createApi } from "@reduxjs/toolkit/query/react";
import {
  IChangePasswordPayload,
  IChangeRolePayload,
  IEditUserPayload,
  IGetUserPayload,
} from "./types";
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

    getAllUsers: builder.query<IProfile[], void>({
      query: () => ({
        url: "/all",
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

    editUser: builder.mutation<void, IEditUserPayload>({
      query: ({ userid, body }) => ({
        url: `/${userid}`,
        method: "PATCH",
        body,
      }),
    }),

    changePassword: builder.mutation<void, IChangePasswordPayload>({
      query: ({ userid, body }) => ({
        url: `/password/${userid}`,
        method: "PATCH",
        body,
      }),
    }),

    changeRole: builder.mutation<void, IChangeRolePayload>({
      query: ({ userid, body }) => ({
        url: `/role/${userid}`,
        method: "PATCH",
        body,
      }),
    }),
  }),
});

export const {
  useGetUserQuery,
  useGetUsersOptionsQuery,
  useGetUsersRecordQuery,
  useEditUserMutation,
  useChangePasswordMutation,
  useGetAllUsersQuery,
  useChangeRoleMutation,
} = usersApi;
