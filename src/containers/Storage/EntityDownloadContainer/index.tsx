import { FC, MouseEventHandler, useState } from "react";
import EntityDownload from "@/components/Storage/EntityDownload";
import {
  useGetStorageEntitiesQuery,
  useGetStorageEntityQuery,
  useRenameEntityMutation,
} from "../api";
import { SERVER_BASE_URL } from "@/core/constants";
import { download } from "@/core/utils";
import { useNavigate, useParams, useSearch } from "@tanstack/react-router";
import RenameEntityModalContainer from "../StorageTableContainer/RenameEntityModalContainer";
import { useDispatch } from "react-redux";
import { setStorageBuffer } from "../slice";
import useApp from "antd/es/app/useApp";

const EntityDownloadContainer: FC = () => {
  const [isRenameModalOpen, setIsRenameModalOpen] = useState<boolean>(false);
  const [isFileBufferFetching, setIsFileBufferFetching] =
    useState<boolean>(false);

  const { message } = useApp();

  const { storageid } = useParams({
    from: "/_layout/storage/_layout/$storageid",
  });
  const { parent, entityid } = useSearch({
    from: "/_layout/storage/_layout/$storageid",
  });
  const navigate = useNavigate();

  const [rename] = useRenameEntityMutation();
  const { refetch: refetchEntities } = useGetStorageEntitiesQuery({
    storageid,
    params: { parent },
  });
  const {
    data: entity,
    refetch: refetchEntity,
    isFetching,
  } = useGetStorageEntityQuery(
    {
      storageid,
      entityid,
    },
    { skip: !entityid },
  );

  const dispatch = useDispatch();

  const handleCloseRenameModal = () => {
    setIsRenameModalOpen(false);
  };

  const handleOpenRenameModal = () => {
    setIsRenameModalOpen(true);
  };

  const handleOkRenameModal = async (values: Record<string, any>) => {
    await rename({
      storageid,
      body: {
        entity: entity?._id ?? "",
        fullname: values.fullname,
      },
    });
    refetchEntities();
    refetchEntity();
  };

  const handleCopy = () => {
    if (entity) {
      dispatch(
        setStorageBuffer({
          type: "copy",
          items: [entity],
        }),
      );
      message.info("Скопирована 1 сущность");
    }
  };

  const handleCut = () => {
    if (entity) {
      dispatch(
        setStorageBuffer({
          type: "cut",
          items: [entity],
        }),
      );
      message.info("Вырезана 1 сущность");
    }
  };

  const handleClose: MouseEventHandler<HTMLButtonElement> = (event) => {
    event.stopPropagation();
    navigate({ to: `/storage/${storageid}`, search: { parent } });
  };

  const handleDownload = async () => {
    try {
      setIsFileBufferFetching(true);
      const response = await fetch(
        `${SERVER_BASE_URL}/entities/blob/${storageid}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            entities: [entity?._id],
          }),
          credentials: "include",
        },
      );

      const size = response.headers.get("Content-Length");

      download(response, entity?.fullname ?? "", +(size ?? 0) || undefined);
      setIsFileBufferFetching(false);
    } catch (error) {
      setIsFileBufferFetching(false);
      console.error(error);
    }
  };

  const dropdownHandlers: Record<string, () => void> = {
    rename: handleOpenRenameModal,
    copy: handleCopy,
    cut: handleCut,
  };

  return (
    <>
      <EntityDownload
        handleDownload={handleDownload}
        handleClose={handleClose}
        isFetching={isFetching}
        dropdownHandlers={dropdownHandlers}
        isDownloading={isFileBufferFetching}
        entity={entity}
      />
      {entity && (
        <RenameEntityModalContainer
          selected={entity}
          open={isRenameModalOpen}
          handleOkModal={handleOkRenameModal}
          handleCloseModal={handleCloseRenameModal}
        />
      )}
    </>
  );
};

export default EntityDownloadContainer;
