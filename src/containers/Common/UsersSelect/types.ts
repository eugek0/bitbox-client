import { SelectProps } from "antd";

export type UsersSelectProps = Omit<SelectProps, "options" | "loading">;
