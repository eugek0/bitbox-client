import {
  BaseQueryFn,
  FetchArgs,
  fetchBaseQuery,
} from "@reduxjs/toolkit/query/react";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query/react";
import { SERVER_BASE_URL } from "../constants.env";

const baseQuery = fetchBaseQuery({
  credentials: "include",
});

const fetchMainBaseQuery =
  (
    args: string | FetchArgs,
  ): BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> =>
  async (_, api, extraOptions) => {
    let result = await baseQuery(args, api, extraOptions);

    if (result.error && result.error.status === 401) {
      await baseQuery(`${SERVER_BASE_URL}/auth/refresh`, api, extraOptions);
      result = await baseQuery(args, api, extraOptions);
    }

    return result;
  };

export default fetchMainBaseQuery;
