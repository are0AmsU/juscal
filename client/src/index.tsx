import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./style.css";
import { GlobalContextProvider } from "./ui/contexts/GlobalContext";
import { MapContextProvider } from "./ui/contexts/MapContext";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <GlobalContextProvider>
    <MapContextProvider>
      <App />
    </MapContextProvider>
  </GlobalContextProvider>
);
