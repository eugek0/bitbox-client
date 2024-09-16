import { FC } from "react";
import { ProfileMenuPopoverProps } from "./types";
import { Button } from "antd";
import { LogoutOutlined } from "@ant-design/icons";

const ProfileMenuPopover: FC<ProfileMenuPopoverProps> = ({ handleLogout }) => {
  return (
    <div>
      <Button
        size="small"
        onClick={handleLogout}
        type="text"
        icon={<LogoutOutlined />}
      >
        Выйти
      </Button>
    </div>
  );
};

export default ProfileMenuPopover;
