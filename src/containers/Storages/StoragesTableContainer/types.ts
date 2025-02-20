import { TCreateStorageModalFields } from "./CreateStorageModalContainer/types";

export interface IStoragesTableRecord {
  name: string;
  description: string;
  owner: string;
  createdAt: string;
  used: number;
  size: number;
}

export interface IStorageTableContext {
  isModalOpen: boolean;
  isModalLoading: boolean;
  handleOkModal: (values: TCreateStorageModalFields) => Promise<void>;
  handleCloseModal: () => void;
}
