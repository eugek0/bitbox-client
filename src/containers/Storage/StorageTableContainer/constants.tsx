import { Flex, TableColumnType, Typography } from "antd";
import { convertBytes } from "@/core/utils";
import { EntityType, IEntity } from "../types";
import { ReactNode } from "react";
import { FileFilled, FolderFilled, SettingFilled } from "@ant-design/icons";
import ProfileBadgeContainer from "@/containers/Common/ProfileBadgeContainer";
import {
  FaCss3,
  FaDatabase,
  FaFileAlt,
  FaFileAudio,
  FaFileExcel,
  FaFileImage,
  FaFilePdf,
  FaFilePowerpoint,
  FaFileVideo,
  FaFileWord,
  FaHtml5,
  FaLess,
  FaMarkdown,
  FaPython,
  FaReact,
  FaSass,
} from "react-icons/fa";
import { FaFileZipper } from "react-icons/fa6";
import { ImSvg } from "react-icons/im";
import { SiJavascript, SiJson, SiTypescript, SiUtorrent } from "react-icons/si";
import { LuCodeXml } from "react-icons/lu";
import { IoTerminal } from "react-icons/io5";
import moment from "moment";

export const STORAGE_TABLE_ENTITY_TYPE_ICONS: Record<EntityType, ReactNode> = {
  file: <FileFilled />,
  directory: <FolderFilled />,
};

export const ENTITY_TYPE_DICTIONARY: Record<string, string> = {
  directory: "Директория",
  txt: "TXT",
  file: "Файл",
  exe: "EXE",
  docx: "DOCX",
  doc: "DOC",
  xlsx: "XLSX",
  xls: "XLS",
  zip: "ZIP",
  md: "Markdown",
  sql: "SQL",
  svg: "SVG",
  mp4: "MP4",
  avif: "AVIF",
  mkv: "MKV",
  mp3: "MP3",
  pdf: "PDF",
  torrent: "Torrent",
  xml: "XML",
  json: "JSON",
  sh: "SHELL",
  bash: "BASH",
  js: "JavaScript",
  ts: "TypeScript",
  py: "Python",
  jsx: "JSX",
  tsx: "TSX",
  html: "HTML",
  css: "CSS",
  scss: "SCSS",
  sass: "SASS",
  less: "LESS",
  ppt: "PPT",
  pptx: "PPTX",
  png: "PNG",
  jpg: "JPG",
  jpeg: "JPEG",
  gif: "GIF",
};

export const ENTITY_TYPE_ICON_DICTIONARY: Record<string, ReactNode> = {
  directory: <FolderFilled />,
  txt: <FaFileAlt />,
  exe: <SettingFilled />,
  docx: <FaFileWord />,
  doc: <FaFileWord />,
  xlsx: <FaFileExcel />,
  xls: <FaFileExcel />,
  zip: <FaFileZipper />,
  md: <FaMarkdown />,
  sql: <FaDatabase />,
  svg: <ImSvg />,
  mp4: <FaFileVideo />,
  avif: <FaFileVideo />,
  mkv: <FaFileVideo />,
  mp3: <FaFileAudio />,
  pdf: <FaFilePdf />,
  torrent: <SiUtorrent />,
  xml: <LuCodeXml />,
  json: <SiJson />,
  sh: <IoTerminal />,
  bash: <IoTerminal />,
  js: <SiJavascript />,
  ts: <SiTypescript />,
  py: <FaPython />,
  jsx: <FaReact />,
  tsx: <FaReact />,
  html: <FaHtml5 />,
  css: <FaCss3 />,
  scss: <FaSass />,
  sass: <FaSass />,
  less: <FaLess />,
  ppt: <FaFilePowerpoint />,
  pptx: <FaFilePowerpoint />,
  png: <FaFileImage />,
  jpg: <FaFileImage />,
  jpeg: <FaFileImage />,
  gif: <FaFileImage />,
};

export const STORAGE_TABLE_COLUMNS: TableColumnType<IEntity>[] = [
  {
    title: "Название",
    dataIndex: "fullname",
    width: "25%",
    ellipsis: true,
    sorter: {
      compare: (a, b) => b.name.localeCompare(a.name),
    },
    showSorterTooltip: false,
    render: (name, record) => {
      return (
        <Flex align="center" gap={10}>
          {ENTITY_TYPE_ICON_DICTIONARY[
            record.type === "directory"
              ? record.type
              : record.extension.toLowerCase()
          ] ?? <FileFilled />}
          <Typography.Text>{name}</Typography.Text>
        </Flex>
      );
    },
  },
  {
    title: "Загружено",
    dataIndex: "uploadedAt",
    width: "4%",
    sorter: {
      compare: (a, b) =>
        moment(a.uploadedAt).isAfter(moment(b.uploadedAt)) ? 1 : -1,
    },
    showSorterTooltip: false,
    render: (uploadedAt) => moment(uploadedAt).format("DD.MM.YYYY HH:mm:ss"),
  },
  {
    title: "Тип",
    dataIndex: "type",
    width: "4%",
    sorter: {
      compare: (a, b) => b.type.localeCompare(a.type),
    },
    showSorterTooltip: false,
    render: (type, record) => (
      <Flex gap={10} align="center">
        {ENTITY_TYPE_ICON_DICTIONARY[
          type === "directory" ? type : record.extension.toLowerCase()
        ] ?? <FileFilled />}
        {ENTITY_TYPE_DICTIONARY[
          type === "directory" ? type : record.extension.toLowerCase()
        ] ?? "Файл"}
      </Flex>
    ),
  },
  {
    title: "Загрузил",
    dataIndex: "uploader",
    width: "4%",
    sorter: {
      compare: (a, b) => b.uploader.localeCompare(a.uploader),
    },
    showSorterTooltip: false,
    render: (uploader) => <ProfileBadgeContainer _id={uploader} />,
  },
  {
    title: "Размер",
    dataIndex: "size",
    width: "6.25%",
    sorter: {
      compare: (a, b) => a.size - b.size,
    },
    showSorterTooltip: false,
    render: (size) => convertBytes(size ?? 0),
  },
];
