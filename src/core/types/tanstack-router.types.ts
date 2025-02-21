import { IProfile } from "@/containers/Auth/types";
import { Nullable } from "./generics";

export interface IRouterContext {
  profile: Nullable<IProfile>;
}
