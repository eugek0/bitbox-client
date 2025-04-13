import { FC, useState } from "react";
import StorageFile from "@/components/Storage/StorageFile";
import { useGetStorageEntityQuery } from "../api";
import { useParams, useRouter } from "@tanstack/react-router";
import { downloadBlob } from "@/core/utils";
import { SERVER_BASE_URL } from "@/core/constants";

const StorageFileContainer: FC = () => {
  const [isFileBufferFetching, setIsFileBufferFetching] =
    useState<boolean>(false);
  const { storageid, entityid } = useParams({
    from: "/storage/$storageid/entity/$entityid",
  });
  const router = useRouter();

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
      const chunks: any[] = [];

      const reader = response.body?.getReader();
      reader?.read().then(function processChunk({ done, value }) {
        if (done) {
          const blob = new Blob(chunks);

          downloadBlob(blob, file?.fullname ?? "");
          setIsFileBufferFetching(false);
          return;
        }
        chunks.push(value);
        reader.read().then(processChunk);
      });
    } catch (error) {
      setIsFileBufferFetching(false);
      console.error(error);
    }
  };

  const handleClickBack = () => {
    router.history.back();
  };

  return (
    <StorageFile
      handleDownload={handleDownload}
      handleClickBack={handleClickBack}
      isFetching={isFileBufferFetching}
      fullname={file?.fullname ?? ""}
      size={file?.size ?? 0}
    />
  );
};

export default StorageFileContainer;
