import { FC, PropsWithChildren, useEffect, useState } from "react";
import AsideLayout from "@/components/Layouts/AsideLayout";
import { useAppSelector } from "@/store";
import { profileSelector } from "@/containers/Auth/selectors";
import { SiderProps } from "antd";
import { useLocation, useNavigate } from "@tanstack/react-router";
import { getKeyFromPath } from "@/core/router";
import { useLogoutMutation } from "@/containers/Auth/api";
import { SERVER_BASE_URL } from "@/core/constants";

const AsideLayoutContainer: FC<PropsWithChildren> = (props) => {
  const [collapsed, setCollapsed] = useState<boolean>(true);
  const [menuSelectedKeys, setMenuSelectedKeys] = useState<string[]>([]);

  const profile = useAppSelector(profileSelector);

  const navigate = useNavigate();
  const location = useLocation();

  const [logout] = useLogoutMutation();

  const clickHandlers: Record<string, () => void> = {
    storages: () => {
      navigate({ to: "/" });
    },
    api: () => {
      window.open(`${SERVER_BASE_URL}/api`, "_blank");
    },
  };

  const handleChangeCollapsed: SiderProps["onCollapse"] = (state) => {
    setCollapsed(state);
  };

  const handleLogout = async () => {
    await logout();
  };

  useEffect(() => {
    const key = getKeyFromPath(location.pathname);
    setMenuSelectedKeys(key ? [key] : []);
  }, [location]);

  return (
    <AsideLayout
      profile={profile}
      collapsed={collapsed}
      menuSelectedKeys={menuSelectedKeys}
      handleChangeCollapsed={handleChangeCollapsed}
      clickHandlers={clickHandlers}
      handleLogout={handleLogout}
      {...props}
    />
  );
};

export default AsideLayoutContainer;
