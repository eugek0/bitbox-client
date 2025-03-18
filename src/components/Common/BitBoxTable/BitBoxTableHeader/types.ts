import { BitBoxTableRecord } from "@/containers/Common/BitBoxTableContainer/types";
import { BitBoxTableProps } from "../types";

export type BitBoxTableHeaderProps<T extends BitBoxTableRecord> = Pick<
  BitBoxTableProps<T>,
  "header" | "modalProps"
>;
