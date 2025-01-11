import { theme, ThemeConfig } from "antd";

export const appTheme: ThemeConfig = {
  token: {
    colorPrimary: "#33d17a",
    colorInfo: "#33d17a",
    colorBgBase: "#221d22",
  },
  algorithm: theme.darkAlgorithm,
  components: {
    Layout: {
      headerBg: "rgb(34,29,34)",
      siderBg: "rgb(34,29,34)",
      triggerBg: "rgb(34,29,34)",
    },
  },
};
