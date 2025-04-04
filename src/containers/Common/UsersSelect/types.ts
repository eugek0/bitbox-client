import { SelectProps } from "antd";
import { DefaultOptionType } from "antd/es/select";

export interface UsersSelectProps
  extends Omit<SelectProps, "options" | "loading"> {
  filterFn?: (value: DefaultOptionType, index: number) => boolean;
}
