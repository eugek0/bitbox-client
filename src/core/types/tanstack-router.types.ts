import { IProfile } from "@/containers/Auth/types";
import { Nullable } from "./generics";
import { IAppStatus } from "@/containers/App/types";

export interface IRouterContext {
  profile: Nullable<IProfile>;
  appStatus: Nullable<IAppStatus>;
}
