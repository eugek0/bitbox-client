import { ReactNode } from "react";
import { SiderProps } from "antd";
import { IProfile } from "@/containers/Auth/types";
import { Nullable } from "@/core/types";

export type AsideLayoutButtons = "storages" | "settings" | "api" | "profile";

export interface AsideLayoutProps {
  children?: ReactNode;
  profile: Nullable<IProfile>;
  collapsed: boolean;
  menuSelectedKeys: string[];
  handleChangeCollapsed: SiderProps["onCollapse"];
  clickHandlers: Record<AsideLayoutButtons, () => void>;
  handleLogout: () => void;
}
