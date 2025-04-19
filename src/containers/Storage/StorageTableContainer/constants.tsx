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
  FaLock,
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
  txt: "TXT файл",
  file: "Файл",
  exe: "EXE файл",
  docx: "DOCX файл",
  doc: "DOC файл",
  xlsx: "XLSX фвйл",
  xls: "XLS файл",
  zip: "ZIP файл",
  md: "MD файл",
  sql: "SQL файл",
  svg: "SVG файл",
  mp4: "MP4 файл",
  avif: "AVIF файл",
  mkv: "MKV файл",
  mp3: "MP3 файл",
  pdf: "PDF файл",
  torrent: "Torrent файл",
  xml: "XML файл",
  json: "JSON файл",
  sh: "SHELL файл",
  bash: "BASH файл",
  lock: "LOCK файл",
  js: "JS файл",
  ts: "TS файл",
  py: "Python файл",
  jsx: "JSX файл",
  tsx: "TSX файл",
  html: "HTML файл",
  css: "CSS файл",
  scss: "SCSS файл",
  sass: "SASS файл",
  less: "LESS файл",
  ppt: "PPT файл",
  pptx: "PPTX файл",
  png: "PNG файл",
  jpg: "JPG файл",
  jpeg: "JPEG файл",
  gif: "GIF файл",
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
  lock: <FaLock />,
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
