import "@unocss/reset/tailwind.css";
import App from "App";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "uno.css";

const root = createRoot(document.getElementById("root")!);

root.render(
  <StrictMode>
    <App />
  </StrictMode>
);
