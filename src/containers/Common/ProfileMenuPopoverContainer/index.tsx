import { FC, MouseEventHandler } from "react";
import ProfileMenuPopover from "@/components/Common/ProfileMenuPopover";
import { useLogoutMutation } from "@/containers/Auth/api";
import { profileSelector } from "@/containers/Auth/selectors";
import { useAppSelector } from "@/store";

const ProfileMenuPopoverContainer: FC = () => {
  const profile = useAppSelector(profileSelector);

  const [logout] = useLogoutMutation();

  const handleLogout: MouseEventHandler<HTMLButtonElement> = async () => {
    await logout();
  };

  return <ProfileMenuPopover profile={profile!} handleLogout={handleLogout} />;
};

export default ProfileMenuPopoverContainer;
