import { MouseEventHandler } from "react";

export interface StorageFileProps {
  fullname: string;
  size: number;
  isFetching: boolean;
  handleDownload: MouseEventHandler<HTMLButtonElement>;
  handleClickBack: MouseEventHandler<HTMLButtonElement>;
}
