import ProfileAvatar from "@/components/Common/ProfileAvatar";
import { profileSelector } from "@/containers/Auth/selectors";
import { useAppSelector } from "@/store";
import { PopoverProps } from "antd";
import { FC, useState } from "react";

const ProfileAvatarContainer: FC = () => {
  const profile = useAppSelector(profileSelector);

  const [isPopoverOpened, setPopoverOpened] = useState<boolean>(false);

  const handleTogglePopover: PopoverProps["onOpenChange"] = (open) => {
    setPopoverOpened(open);
  };

  return (
    <ProfileAvatar
      isPopoverOpened={isPopoverOpened}
      handleTogglePopover={handleTogglePopover}
      profile={profile!}
    />
  );
};

export default ProfileAvatarContainer;
