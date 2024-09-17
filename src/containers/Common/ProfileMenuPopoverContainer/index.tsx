import ProfileMenuPopover from "@/components/Common/ProfileMenuPopover";
import {
  authApi,
  useGetProfileQuery,
  useLogoutMutation,
} from "@/containers/Auth/api";
import { useNavigate } from "@tanstack/react-router";
import { FC, MouseEventHandler } from "react";
import { useDispatch } from "react-redux";

const ProfileMenuPopoverContainer: FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { data } = useGetProfileQuery();
  const [logout] = useLogoutMutation();

  const handleLogout: MouseEventHandler<HTMLButtonElement> = async () => {
    await logout();
    dispatch(authApi.util.resetApiState());
    navigate({ to: "/" });
  };

  return <ProfileMenuPopover profile={data!} handleLogout={handleLogout} />;
};

export default ProfileMenuPopoverContainer;
