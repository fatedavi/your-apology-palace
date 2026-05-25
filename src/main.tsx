import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import { App } from "./router";
import "./styles.css";

const rootElement = document.getElementById("root")!;
if (!rootElement.innerHTML) {
  ReactDOM.createRoot(rootElement).render(
    <StrictMode>
      <App />
    </StrictMode>,
  );
}
