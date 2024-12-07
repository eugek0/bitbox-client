import { Nullable } from "@/core/types";

export interface IAppState {
  appStatus: Nullable<IAppStatus>;
}

export interface IAppStatus {
  virgin: boolean;
}
