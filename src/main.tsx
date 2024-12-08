import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import App from "./containers/App";
import { store } from "./store";
import { ConfigProvider } from "antd";
import { theme } from "./core/theme";
import "@/core/styles/normalize.css";
import "@/core/styles/defaults.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ConfigProvider theme={theme}>
      <Provider store={store}>
        <App />
      </Provider>
    </ConfigProvider>
  </StrictMode>,
);
