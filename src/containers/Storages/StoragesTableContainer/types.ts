import { IStorageMember, TStorageMemberRole } from "../types";

export interface IStoragesTableRecord {
  name: string;
  description: string;
  owner: string;
  createdAt: string;
  used: number;
  size: number;
  members: IStorageMember[];
  defaultRole: TStorageMemberRole;
}
