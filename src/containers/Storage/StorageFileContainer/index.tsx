import { FC } from "react";
import StorageFile from "@/components/Storage/StorageFile";
import { useGetStorageEntityQuery, useLazyGetStorageFileQuery } from "../api";
import { useParams, useRouter } from "@tanstack/react-router";

const StorageFileContainer: FC = () => {
  const { storageid, fileid } = useParams({
    from: "/storage/$storageid/file/$fileid",
  });
  const router = useRouter();

  const { data: file } = useGetStorageEntityQuery({
    storageid,
    entityid: fileid,
  });
  const [getFileBuffer, { isLoading: isFileBufferFetching }] =
    useLazyGetStorageFileQuery();

  const handleDownload = async () => {
    const blob = await getFileBuffer({ storageid, fileid }).unwrap();
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.download = `${file?.fullname ?? "file"}`;
    link.href = url;
    link.click();
    URL.revokeObjectURL(url);
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
