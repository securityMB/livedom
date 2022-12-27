import { render } from "preact";
import "./index.css";
import "@fontsource/bebas-neue";
import { MainApp } from "./components/MainApp";

render(<MainApp />, document.getElementById("app") as HTMLElement);
