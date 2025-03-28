import { Base64, Nullable } from "@/core/types";

export interface IProfile {
  _id: string;
  login: string;
  email: string;
  createdAt: string;
  avatar: Base64;
  role: TRole;
}

export type TRole = "user" | "admin";

export interface IAuthState {
  profile: Nullable<IProfile>;
}

// INFO: Интерфейсы и типы для API

export interface IRegisterPayload {
  login: string;
  email: string;
  password: string;
}

export interface ILoginPayload {
  email: string;
  password: string;
}
