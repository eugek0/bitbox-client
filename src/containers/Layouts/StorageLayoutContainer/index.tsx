import { FC } from "react";
import { useParams } from "@tanstack/react-router";
import FullscreenLoader from "@/containers/Common/FullscreenLoader";
import StorageForbidden from "@/components/Layouts/StorageLayout/StorageForbidden";
import StorageNotFound from "@/components/Layouts/StorageLayout/StorageNotFound";
import { isRTKQueryError } from "@/core/typeguards/rtkquery.typeguards";
import { useGetStorageQuery } from "@/containers/Storage/api";
import { StorageLayoutContainerProps } from "./types";
import { StorageContext } from "./context";

const StorageLayoutContainer: FC<StorageLayoutContainerProps> = ({
  children,
}) => {
  const { storageid } = useParams({ strict: false });

  const {
    data: storage,
    error,
    isLoading,
  } = useGetStorageQuery(storageid!, { skip: !storageid });

  if (isLoading) {
    return <FullscreenLoader />;
  }

  if (isRTKQueryError(error) && error.status === 404) {
    return <StorageNotFound />;
  }

  if (isRTKQueryError(error) && error?.status === 403) {
    return <StorageForbidden error={error} />;
  }

  return <StorageContext value={storage ?? {}}>{children}</StorageContext>;
};

export default StorageLayoutContainer;
