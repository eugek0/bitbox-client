import LogsInfoModal from "@/components/Settings/LogsSettings/LogsTable/LogsInfoModal";
import { BitBoxTableInfoModalProps } from "@/containers/Common/BitBoxTableContainer/types";
import { FC } from "react";
import { useGetMethodsQuery } from "../../api";

const LogsInfoModalContainer: FC<BitBoxTableInfoModalProps> = ({
  setConfig,
  ...props
}) => {
  const { data: methods } = useGetMethodsQuery();

  const handleCloseModal = () => {
    setConfig({ open: false });
  };

  return (
    <LogsInfoModal
      methods={methods ?? []}
      onCancel={handleCloseModal}
      onOk={handleCloseModal}
      {...props}
    />
  );
};

export default LogsInfoModalContainer;
