import { IProfile, TRole } from "@/containers/Auth/types";

export interface UsersSettingsProps {
  users: IProfile[];
  handleChangeRole: (_id: string, role: TRole) => void;
}
