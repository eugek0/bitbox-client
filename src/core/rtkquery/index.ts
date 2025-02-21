import {
  BaseQueryFn,
  FetchArgs,
  fetchBaseQuery,
  FetchBaseQueryError,
} from "@reduxjs/toolkit/query/react";
import { SERVER_BASE_URL } from "../constants";
import { isNotification } from "../typeguards";

const baseQuery = fetchBaseQuery({
  credentials: "include",
});

const fetchMainBaseQuery =
  (
    basePath: string,
  ): BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> =>
  async (args, api, extraOptions) => {
    const updatedArgs: string | FetchArgs =
      typeof args === "string"
        ? `${SERVER_BASE_URL}${basePath}${args.startsWith("/") ? args : `/${args}`}`
        : {
            ...args,
            url: `${SERVER_BASE_URL}${basePath}${args.url.startsWith("/") ? args.url : `/${args.url}`}`,
          };

    let result = await baseQuery(updatedArgs, api, extraOptions);

    if (result.error && result.error.status === 401) {
      const refreshResponse = await baseQuery(
        `${SERVER_BASE_URL}/auth/refresh`,
        api,
        extraOptions,
      );
      if (!refreshResponse.error) {
        result = await baseQuery(updatedArgs, api, extraOptions);
      }
    }

    const data = result.error?.data ?? result.data;
    if (isNotification(data)) {
      api.dispatch({
        type: "app/setNotification",
        payload: data.notification,
      });
    }

    return result;
  };

export default fetchMainBaseQuery;
