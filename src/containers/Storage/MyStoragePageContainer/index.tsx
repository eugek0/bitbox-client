import { FC } from "react";
import { useGetStorageInfoQuery } from "../api";
import { skipToken } from "@reduxjs/toolkit/query";
import { useAppSelector } from "@/store";
import { profileIdSelector } from "@/containers/Auth/selectors";
import MyStoragePage from "@/modules/Storage/MyStoragePage";

const MyStoragePageContainer: FC = () => {
  const profileId = useAppSelector(profileIdSelector);

  useGetStorageInfoQuery(profileId ?? skipToken);

  return <MyStoragePage />;
};

export default MyStoragePageContainer;
