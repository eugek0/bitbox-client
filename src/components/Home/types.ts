import { IProfile } from "@/containers/Auth/types";
import { Nullable } from "@/core/types";

export interface HomeProps {
  profile: Nullable<IProfile>;
}
