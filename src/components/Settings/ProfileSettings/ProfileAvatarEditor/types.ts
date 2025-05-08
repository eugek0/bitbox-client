import { MouseEventHandler } from "react";
import { CropperProps } from "react-easy-crop";

export interface ProfileAvatarEditorProps
  extends Pick<
    CropperProps,
    | "image"
    | "crop"
    | "onCropChange"
    | "zoom"
    | "onZoomChange"
    | "onCropComplete"
  > {
  isAvatarChanging: boolean;
  handleGetCroppedImage: MouseEventHandler<HTMLButtonElement>;
  handleClose: MouseEventHandler;
}
