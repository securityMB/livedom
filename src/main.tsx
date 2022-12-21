import { render } from "preact";
import { App } from "./app";
import "./index.css";
import "@fontsource/bebas-neue";
import { ConfigContextProvider } from "./ConfigContext";

render(
  <ConfigContextProvider>
    <App />
  </ConfigContextProvider>,
  document.getElementById("app") as HTMLElement
);
