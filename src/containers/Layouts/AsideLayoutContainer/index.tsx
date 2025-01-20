import { FC, PropsWithChildren, useEffect, useState } from "react";
import AsideLayout from "@/components/Layouts/AsideLayout";
import { useAppSelector } from "@/store";
import { profileSelector } from "@/containers/Auth/selectors";
import { SiderProps } from "antd";
import { useLocation } from "@tanstack/react-router";
import { getKeyFromPath } from "@/core/router";

const AsideLayoutContainer: FC<PropsWithChildren> = (props) => {
  const [collapsed, setCollapsed] = useState<boolean>(true);
  const [menuSelectedKeys, setMenuSelectedKeys] = useState<string[]>([]);

  const location = useLocation();

  const profile = useAppSelector(profileSelector);

  const handleChangeCollapsed: SiderProps["onCollapse"] = (state) => {
    setCollapsed(state);
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
      {...props}
    />
  );
};

export default AsideLayoutContainer;
