import { FC } from "react";
import BitBoxTableContainer from "@/containers/BitBoxTableContainer";
import { STORAGE_TABLE_COLUMNS } from "./constants";

const StorageTableContainer: FC = () => {
  return (
    <BitBoxTableContainer
      records={[]}
      columns={STORAGE_TABLE_COLUMNS}
      loading={false}
      header={{
        title: "Хранилище",
      }}
    />
  );
};

export default StorageTableContainer;
