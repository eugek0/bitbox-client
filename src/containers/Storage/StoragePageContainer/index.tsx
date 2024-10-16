import StoragePage from "@/modules/Storage/StoragePage";
import { skipToken } from "@reduxjs/toolkit/query";
import { useParams } from "@tanstack/react-router";
import { FC } from "react";
import { useGetStorageInfoQuery } from "../api";

const StoragePageContainer: FC = () => {
  const { userId } = useParams({ from: "/storage/$userId" });

  useGetStorageInfoQuery(userId ?? skipToken);

  return <StoragePage />;
};

export default StoragePageContainer;
