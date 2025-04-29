import { IProfile } from "@/containers/Auth/types";

export interface IGetUserPayload {
  _id?: string;
  email?: string;
  login?: string;
}

export interface IEditUserPayload {
  userid: string;
  body: Partial<IProfile>;
}
