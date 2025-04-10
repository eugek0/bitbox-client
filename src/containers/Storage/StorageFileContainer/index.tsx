import { FC } from "react";
import StorageFile from "@/components/Storage/StorageFile";
import { useGetStorageEntityQuery, useLazyGetStorageFileQuery } from "../api";
import { useParams, useRouter } from "@tanstack/react-router";
import { downloadBlob } from "@/core/utils";

const StorageFileContainer: FC = () => {
  const { storageid, entityid } = useParams({
    from: "/storage/$storageid/entity/$entityid",
  });
  const router = useRouter();

  const { data: file } = useGetStorageEntityQuery({
    storageid,
    entityid,
  });
  const [getFileBuffer, { isLoading: isFileBufferFetching }] =
    useLazyGetStorageFileQuery();

  const handleDownload = async () => {
    const blob = await getFileBuffer({
      storageid,
      body: {
        entities: [entityid],
      },
    }).unwrap();
    downloadBlob(blob);
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
