import { IProfile } from "@/containers/Auth/types";
import { Nullable } from "@/core/types";
import { SiderProps } from "antd";
import { ReactNode } from "react";

export interface AsideLayoutProps {
  children?: ReactNode;
  profile: Nullable<IProfile>;
  collapsed: boolean;
  menuSelectedKeys: string[];
  handleChangeCollapsed: SiderProps["onCollapse"];
}
