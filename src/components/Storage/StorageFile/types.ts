import { IEntity } from "@/containers/Storage/types";
import { MouseEventHandler } from "react";

export interface StorageFileProps {
  entity: IEntity | undefined;
  isFetching: boolean;
  handleDownload: MouseEventHandler<HTMLButtonElement>;
  handleClickBack: MouseEventHandler<HTMLButtonElement>;
}
