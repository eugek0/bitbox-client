import { FC, MouseEventHandler, useEffect } from "react";
import ProfileMenuPopover from "@/components/Common/ProfileMenuPopover";
import { useLogoutMutation } from "@/containers/Auth/api";
import { profileSelector } from "@/containers/Auth/selectors";
import { useAppSelector } from "@/store";
import { useNavigate } from "@tanstack/react-router";

const ProfileMenuPopoverContainer: FC = () => {
  const profile = useAppSelector(profileSelector);
  const navigate = useNavigate();

  const [logout] = useLogoutMutation();

  const handleLogout: MouseEventHandler<HTMLButtonElement> = async () => {
    await logout();
  };

  useEffect(() => {
    if (!profile) {
      navigate({ to: "/auth/login" });
    }
  }, [profile]);

  return <ProfileMenuPopover profile={profile!} handleLogout={handleLogout} />;
};

export default ProfileMenuPopoverContainer;
