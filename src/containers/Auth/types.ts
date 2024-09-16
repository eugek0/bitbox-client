import { Base64 } from "@/core/types";

export interface IRegisterPayload {
  login: string;
  email: string;
  password: string;
}

export interface ILoginPayload {
  email: string;
  password: string;
}

export interface IProfile {
  login: string;
  email: string;
  createdAt: string;
  avatar: Base64;
}
