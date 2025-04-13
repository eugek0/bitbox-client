export type DownloadBlob = (
  response: Response,
  fullname: string,
  size?: number,
) => void;
