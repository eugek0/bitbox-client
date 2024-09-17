import ProfileMenuPopover from "@/components/Common/ProfileMenuPopover";
import { useGetProfileQuery, useLogoutMutation } from "@/containers/Auth/api";
import { useNavigate } from "@tanstack/react-router";
import { FC, MouseEventHandler } from "react";

const ProfileMenuPopoverContainer: FC = () => {
  const navigate = useNavigate();

  const { data } = useGetProfileQuery();
  const [logout] = useLogoutMutation();

  const handleLogout: MouseEventHandler<HTMLButtonElement> = async () => {
    await logout();
    navigate({ to: "/" });
  };

  return <ProfileMenuPopover profile={data!} handleLogout={handleLogout} />;
};

export default ProfileMenuPopoverContainer;
