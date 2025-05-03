import { EntityType } from "@/containers/Storage/types";
import { AutoCompleteProps } from "antd";

export type StorageSearcherProps = Omit<AutoCompleteProps, "searchValue">;

export type StorageSearcherType = EntityType | "storage";

export type StorageSearcherVariants = Record<
  StorageSearcherType,
  [string, Record<string, string | number>] | [string]
>;
