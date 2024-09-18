import App from "@/containers/App";
import { store } from "@/store";
import { FC } from "react";
import { Provider } from "react-redux";

const AppModule: FC = () => {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
};

export default AppModule;
