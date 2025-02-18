import { FC, useState } from "react";
import StoragesTable from "@/components/Storages/StoragesTable";
import { useGetStoragesQuery } from "../api";

const StoragesTableContainer: FC = () => {
  const [isModalOpen, setModalOpen] = useState<boolean>(false);

  const { data: storages, isFetching } = useGetStoragesQuery();

  const handleClickCreate = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const handleOkModal = () => {
    handleCloseModal();
  };

  return (
    <StoragesTable
      isModalOpen={isModalOpen}
      storages={storages ?? []}
      loading={isFetching}
      handleClickCreate={handleClickCreate}
      handleCloseModal={handleCloseModal}
      handleOkModal={handleOkModal}
    />
  );
};

export default StoragesTableContainer;
