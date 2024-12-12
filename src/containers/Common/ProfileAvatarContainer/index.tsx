import { FC, useState } from "react";
import { PopoverProps } from "antd";
import ProfileAvatar from "@/components/Common/ProfileAvatar";
import { profileSelector } from "@/containers/Auth/selectors";
import { useAppSelector } from "@/store";

const ProfileAvatarContainer: FC = () => {
  const profile = useAppSelector(profileSelector);

  const [isPopoverOpened, setPopoverOpened] = useState<boolean>(false);

  const handleTogglePopover: PopoverProps["onOpenChange"] = (open) => {
    setPopoverOpened(open);
  };

  return (
    <ProfileAvatar
      profile={profile!}
      isPopoverOpened={isPopoverOpened}
      handleTogglePopover={handleTogglePopover}
    />
  );
};

export default ProfileAvatarContainer;
