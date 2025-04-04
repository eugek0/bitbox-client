import { FormInstance } from "antd";
import { AddStorageMembersModalContainerProps } from "@/containers/Storages/StoragesTableContainer/CreateStorageModalContainer/StorageMemberRoles/AddStorageMembersModalContainer/types";
import { TStorageMemberRole } from "@/containers/Storages/types";
import { DefaultOptionType } from "antd/es/select";

export interface IAddStorageMembersModalFields {
  members: string[];
  role: TStorageMemberRole;
}

export interface AddStorageMembersModalProps
  extends Omit<
    AddStorageMembersModalContainerProps,
    "handleOkModal" | "members"
  > {
  form: FormInstance;
  initialValues?: Record<string, any>;
  filterFn: (option: DefaultOptionType, index: number) => boolean;
}
