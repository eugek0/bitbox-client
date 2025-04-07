import { DownloadBlob } from "./types";

export const downloadBlob: DownloadBlob = (blob) => {
  const url = URL.createObjectURL(blob);

  const link = document.createElement("a");
  link.download = "";
  link.href = url;
  link.click();
  URL.revokeObjectURL(url);
};
