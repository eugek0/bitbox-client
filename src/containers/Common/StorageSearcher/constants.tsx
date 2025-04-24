import { ReactNode } from "react";
import { ProductFilled } from "@ant-design/icons";
import { ENTITY_TYPE_ICON_DICTIONARY } from "@/containers/Storage/StorageTableContainer/constants";

export const STORAGE_SEARCHER_TYPE_ICONS: Record<string, ReactNode> = {
  storage: <ProductFilled />,
  ...ENTITY_TYPE_ICON_DICTIONARY,
};
