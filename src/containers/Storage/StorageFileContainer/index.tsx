import { FC, useState } from "react";
import StorageFile from "@/components/Storage/StorageFile";
import { useGetStorageEntityQuery } from "../api";
import { useNavigate, useParams, useRouter } from "@tanstack/react-router";
import { download } from "@/core/utils";
import { SERVER_BASE_URL } from "@/core/constants";

const StorageFileContainer: FC = () => {
  const [isFileBufferFetching, setIsFileBufferFetching] =
    useState<boolean>(false);
  const { storageid, entityid } = useParams({
    from: "/storage/$storageid/entity/$entityid",
  });
  const navigate = useNavigate();

  const { data: file } = useGetStorageEntityQuery({
    storageid,
    entityid,
  });

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
            entities: [file?._id],
          }),
          credentials: "include",
        },
      );
      download(response, file?.fullname ?? "");
      setIsFileBufferFetching(false);
    } catch (error) {
      setIsFileBufferFetching(false);
      console.error(error);
    }
  };

  const handleClickBack = () => {
    navigate({
      to: `/storage/${file?.storage}`,
      search: file?.parent ? { parent: file?.parent } : undefined,
    });
  };

  return (
    <StorageFile
      handleDownload={handleDownload}
      handleClickBack={handleClickBack}
      isFetching={isFileBufferFetching}
      entity={file}
    />
  );
};

export default StorageFileContainer;
