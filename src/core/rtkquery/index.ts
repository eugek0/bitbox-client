import {
  BaseQueryFn,
  FetchArgs,
  fetchBaseQuery,
} from "@reduxjs/toolkit/query/react";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query/react";
import { SERVER_BASE_URL } from "../constants";

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
        ? {
            url: `${SERVER_BASE_URL}${basePath}${args.startsWith("/") ? args : `/${args}`}`,
          }
        : {
            ...args,
            url: `${SERVER_BASE_URL}${basePath}${args.url.startsWith("/") ? args.url : `/${args.url}`}`,
          };

    let result = await baseQuery(updatedArgs, api, extraOptions);

    if (result.error && result.error.status === 401) {
      await baseQuery(`${SERVER_BASE_URL}/auth/refresh`, api, extraOptions);
      result = await baseQuery(updatedArgs, api, extraOptions);
    }

    return result;
  };

export default fetchMainBaseQuery;
