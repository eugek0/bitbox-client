import fetchMainBaseQuery from "@/core/rtkquery";
import { createApi } from "@reduxjs/toolkit/query/react";
import { ILoginPayload, IProfile, IRegisterPayload } from "./types";

export const authApi = createApi({
  reducerPath: "auth/api",
  baseQuery: fetchMainBaseQuery("/auth"),
  endpoints: (builder) => ({
    register: builder.mutation<void, IRegisterPayload>({
      query: (body) => ({ url: "/register", body }),
    }),

    login: builder.mutation<void, ILoginPayload>({
      query: (body) => ({ url: "/login", body }),
    }),

    getProfile: builder.query<IProfile, void>({
      query: () => "/profile",
    }),
  }),
});

export const { useRegisterMutation, useLoginMutation, useGetProfileQuery } =
  authApi;