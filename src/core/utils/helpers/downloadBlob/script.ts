import { DownloadBlob } from "./types";

export const downloadBlob: DownloadBlob = (blob, filename) => {
  const url = URL.createObjectURL(blob);

  const link = document.createElement("a");
  link.download = filename;
  link.href = url;
  link.click();
  URL.revokeObjectURL(url);
};
