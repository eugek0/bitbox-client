import { IAddStorageMembersModalFields } from "@/components/Storages/StoragesTable/CreateStorageModal/StorageMemberRoles/AddStorageMembersModal/types";
import { IStorageMember } from "@/containers/Storages/types";
import { ModalProps } from "antd";

export interface AddStorageMembersModalContainerProps
  extends Omit<ModalProps, "title" | "width"> {
  members: IStorageMember[];
  handleOkModal: (values: IAddStorageMembersModalFields) => void;
}
