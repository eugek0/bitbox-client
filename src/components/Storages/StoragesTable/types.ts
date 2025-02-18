import { IStoragesTableRecord } from "@/containers/Storages/StoragesTableContainer/types";

export interface StoragesTableProps {
  isModalOpen: boolean;
  storages: IStoragesTableRecord[];
  loading: boolean;
  handleCloseModal: () => void;
  handleOkModal: () => void;
  handleClickCreate: () => void;
}
