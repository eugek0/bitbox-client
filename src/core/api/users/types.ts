import { IProfile, TRole } from "@/containers/Auth/types";

export interface IGetUserPayload {
  _id?: string;
  email?: string;
  login?: string;
}

export interface IEditUserPayload {
  userid: string;
  body: Partial<IProfile>;
}

export interface IChangePasswordPayload {
  userid: string;
  body: {
    oldPassword: string;
    newPassword: string;
  };
}

export interface IChangeRolePayload {
  userid: string;
  body: {
    role: TRole;
  };
}
