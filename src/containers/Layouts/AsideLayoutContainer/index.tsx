import { FC, PropsWithChildren, useEffect, useState } from "react";
import AsideLayout from "@/components/Layouts/AsideLayout";
import { useAppSelector } from "@/store";
import { profileSelector } from "@/containers/Auth/selectors";
import { SiderProps } from "antd";
import { useLocation, useNavigate } from "@tanstack/react-router";
import { getKeyFromPath } from "@/core/router";
import { useLogoutMutation } from "@/containers/Auth/api";

const AsideLayoutContainer: FC<PropsWithChildren> = (props) => {
  const [collapsed, setCollapsed] = useState<boolean>(true);
  const [menuSelectedKeys, setMenuSelectedKeys] = useState<string[]>([]);

  const location = useLocation();
  const navigate = useNavigate();

  const profile = useAppSelector(profileSelector);

  const [logout] = useLogoutMutation();

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

  useEffect(() => {
    if (!profile) {
      navigate({ to: "/auth/login" });
    }
  }, [profile]);

  return (
    <AsideLayout
      profile={profile}
      collapsed={collapsed}
      menuSelectedKeys={menuSelectedKeys}
      handleChangeCollapsed={handleChangeCollapsed}
      handleLogout={handleLogout}
      {...props}
    />
  );
};

export default AsideLayoutContainer;
