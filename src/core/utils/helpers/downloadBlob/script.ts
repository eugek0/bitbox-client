import { DownloadBlob } from "./types";
import streamsaver from "streamsaver";

export const download: DownloadBlob = (response, fullname, size) => {
  const readableStream = response.body;

  const fileStream = streamsaver.createWriteStream(fullname, { size });
  const writer = fileStream.getWriter();

  const reader = readableStream?.getReader();
  const pump = () =>
    reader?.read().then(({ done, value }) => {
      if (done) {
        writer.close();
        return;
      }
      writer.write(value).then(pump);
    });

  pump();
};
