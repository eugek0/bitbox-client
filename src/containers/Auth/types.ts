import { Base64 } from "@/core/types";

export interface IRegisterPayload {
  username: string;
  email: string;
  password: string;
}

export interface ILoginPayload {
  email: string;
  password: string;
}

export interface IProfile {
  username: string;
  email: string;
  createdAt: string;
  avatar: Base64;
}
