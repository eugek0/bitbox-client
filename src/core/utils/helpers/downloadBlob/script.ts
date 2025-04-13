import { DownloadBlob } from "./types";

export const downloadBlob: DownloadBlob = (blob, fullname) => {
  const url = URL.createObjectURL(blob);

  const link = document.createElement("a");
  link.download = fullname;
  link.href = url;
  link.click();
  URL.revokeObjectURL(url);
};
