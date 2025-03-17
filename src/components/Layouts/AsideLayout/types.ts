import { ReactNode } from "react";
import { SiderProps } from "antd";
import { IProfile } from "@/containers/Auth/types";
import { Nullable } from "@/core/types";

export interface AsideLayoutProps {
  children?: ReactNode;
  profile: Nullable<IProfile>;
  collapsed: boolean;
  menuSelectedKeys: string[];
  handleChangeCollapsed: SiderProps["onCollapse"];
  clickHandlers: Record<string, () => void>;
  handleLogout: () => void;
}
