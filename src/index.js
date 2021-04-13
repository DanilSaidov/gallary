import React from "react";
import ReactDOM from "react-dom";
import { DeviceThemeProvider } from "@sberdevices/ui/components/Device"; // Типографика, имеющая размеры, зависимые от типа устройства
import { GlobalStyle } from "./styles/GlobalStyle"; // Тема оформления (цветовая схема)
import { Provider } from "mobx-react";
import App from "./App";
import gallaryStore from "./store/gallaryStore";
const stores = {
  gallaryStore,
};
ReactDOM.render(
  <React.StrictMode>
    <DeviceThemeProvider>
      <GlobalStyle />
      <Provider {...stores}>
        <App />
      </Provider>
    </DeviceThemeProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
