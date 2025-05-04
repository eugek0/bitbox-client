import { IStorageMember, TStorageMemberRole } from "../types";

export interface IStoragesTableRecord {
  _id: string;
  name: string;
  description: string;
  owner: string;
  createdAt: string;
  used: number;
  size: number;
  members: IStorageMember[];
  defaultRole: TStorageMemberRole;
}
