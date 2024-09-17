import ProfileAvatar from "@/components/Common/ProfileAvatar";
import { useGetProfileQuery } from "@/containers/Auth/api";
import { PopoverProps } from "antd";
import { FC, useState } from "react";

const ProfileAvatarContainer: FC = () => {
  const [isPopoverOpened, setPopoverOpened] = useState<boolean>(false);

  const { data } = useGetProfileQuery();

  const handleTogglePopover: PopoverProps["onOpenChange"] = (open) => {
    setPopoverOpened(open);
  };

  return (
    <ProfileAvatar
      isPopoverOpened={isPopoverOpened}
      handleTogglePopover={handleTogglePopover}
      profile={data!}
    />
  );
};

export default ProfileAvatarContainer;
