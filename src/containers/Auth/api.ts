import fetchMainBaseQuery from "@/core/rtkquery";
import { createApi } from "@reduxjs/toolkit/query/react";
import {
  ILoginPayload,
  IProfile,
  IRecoverPasswordPayload,
  IRegisterPayload,
  ISendRecoverLetterPayload,
} from "./types";

export const authApi = createApi({
  reducerPath: "auth/api",
  baseQuery: fetchMainBaseQuery("/auth"),
  endpoints: (builder) => ({
    register: builder.mutation<void, IRegisterPayload>({
      query: (body) => ({
        url: "/register",
        method: "POST",
        body,
      }),
    }),

    login: builder.mutation<void, ILoginPayload>({
      query: (body) => ({
        url: "/login",
        method: "POST",
        body,
      }),
    }),

    logout: builder.mutation<void, void>({
      query: () => "/logout",
    }),

    getProfile: builder.query<IProfile, void>({
      query: () => "/profile",
    }),

    sendRecoverLetter: builder.mutation<void, ISendRecoverLetterPayload>({
      query: (params) => ({
        url: "/send_recovery_letter",
        params,
      }),
    }),

    recoverPassword: builder.mutation<void, IRecoverPasswordPayload>({
      query: ({ userid, body, params }) => ({
        url: `/recover/${userid}`,
        method: "PATCH",
        params,
        body,
      }),
    }),
  }),
});

export const {
  useRegisterMutation,
  useLoginMutation,
  useLogoutMutation,
  useGetProfileQuery,
  useLazyGetProfileQuery,
  useSendRecoverLetterMutation,
  useRecoverPasswordMutation,
} = authApi;
