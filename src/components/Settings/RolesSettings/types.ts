import { IProfile, TRole } from "@/containers/Auth/types";

export interface RolesSettingsProps {
  users: IProfile[];
  handleChangeRole: (_id: string, role: TRole) => void;
}
