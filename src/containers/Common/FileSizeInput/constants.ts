import { DefaultOptionType } from "antd/es/select";

export const FILE_SIZE_INPUT_OPTIONS: DefaultOptionType[] = [
  {
    value: 1,
    label: "Б",
  },
  {
    value: 1024,
    label: "КБ",
  },
  {
    value: 1048576,
    label: "МБ",
  },
  {
    value: 1073741824,
    label: "ГБ",
  },
];
