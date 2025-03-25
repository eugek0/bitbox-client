import { ResultProps } from "antd";

export type StatusProps = Omit<ResultProps, "status" | "title" | "extra">;
