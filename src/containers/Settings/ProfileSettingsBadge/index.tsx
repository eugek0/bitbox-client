import { FC } from "react";
import ProfileBadge from "@/components/Common/ProfileBadge";
import { profileSelector } from "@/containers/Auth/selectors";
import { useAppSelector } from "@/store";

const ProfileSettingsBadge: FC = () => {
  const profile = useAppSelector(profileSelector);

  return (
    <ProfileBadge
      {...profile}
      showFullname={!!(profile?.name || profile?.lastname)}
      subtitle="Ваш профиль"
      size="large"
    />
  );
};

export default ProfileSettingsBadge;
