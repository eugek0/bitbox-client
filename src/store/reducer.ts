import { authApi } from "@/containers/Auth/api";
import { combineReducers } from "@reduxjs/toolkit";

const reducer = combineReducers({
  [authApi.reducerPath]: authApi.reducer,
});

export default reducer;
