import {
  BaseQueryFn,
  FetchArgs,
  fetchBaseQuery,
} from "@reduxjs/toolkit/query/react";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query/react";
import { SERVER_BASE_URL } from "../constants";
import { notification } from "antd";
import { INotificationData } from "./types";

const baseQuery = fetchBaseQuery({
  credentials: "include",
});

const mainBaseQuery: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);

  if (result.error && result.error.status === 401) {
    await baseQuery(`${SERVER_BASE_URL}/auth/refresh`, api, extraOptions);
    result = await baseQuery(args, api, extraOptions);
  }

  const { status, ...config } = (result.data as INotificationData).notification;
  if (status) {
    notification[status](config);
  }

  return result;
};

export default mainBaseQuery;
