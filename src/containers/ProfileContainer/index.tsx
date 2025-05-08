import { FC } from "react";
import Profile from "@/components/Profile";
import { useAppSelector } from "@/store";
import { profileSelector } from "../Auth/selectors";
import { useParams } from "@tanstack/react-router";
import { useGetUserQuery } from "@/core/api";
import { useGetUserStoragesQuery } from "../Storages/api";

const ProfileContainer: FC = () => {
  const profile = useAppSelector(profileSelector);

  const { userid } = useParams({ from: "/_layout/profile/$userid" });

  const { data: user, isFetching: isUserFetching } = useGetUserQuery({
    _id: userid,
  });
  const { data: storages, isFetching: isStoragesFetching } =
    useGetUserStoragesQuery(userid);

  return (
    <Profile
      profile={user ?? null}
      storages={storages ?? []}
      isProfileLoading={isUserFetching}
      isStoragesLoading={isStoragesFetching}
      isMyProfile={profile?._id === userid}
    />
  );
};

export default ProfileContainer;
