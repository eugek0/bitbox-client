import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { App, ConfigProvider } from "antd";
import { store } from "./store";
import { appTheme } from "./core/theme";
import Root from "./containers/Root";
import ruRu from "antd/locale/ru_RU";
import "@ant-design/v5-patch-for-react-19";
import "@/core/styles/normalize.css";
import "@/core/styles/defaults.scss";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ConfigProvider theme={appTheme} locale={ruRu}>
      <Provider store={store}>
        <App>
          <Root />
        </App>
      </Provider>
    </ConfigProvider>
  </StrictMode>,
);
