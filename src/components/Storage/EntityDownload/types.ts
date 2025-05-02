import { IEntity } from "@/containers/Storage/types";
import { MouseEventHandler } from "react";

export interface EntityDownloadProps {
  entity: IEntity | undefined;
  isFetching: boolean;
  isDownloading: boolean;
  handleClose: MouseEventHandler<HTMLButtonElement>;
  handleDownload: MouseEventHandler<HTMLButtonElement>;
  dropdownHandlers: Record<string, () => void>;
}
