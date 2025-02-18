import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import App from "./containers/App";
import { store } from "./store";
import { ConfigProvider } from "antd";
import { appTheme } from "./core/theme";
import ruRu from "antd/locale/ru_RU";
import "@/core/styles/normalize.css";
import "@/core/styles/defaults.scss";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ConfigProvider theme={appTheme} locale={ruRu}>
      <Provider store={store}>
        <App />
      </Provider>
    </ConfigProvider>
  </StrictMode>,
);
