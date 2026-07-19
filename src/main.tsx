import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import "leaflet/dist/leaflet.css";
import { Toaster } from "react-hot-toast";
import { AIProvider } from "./context/AIContext";
import App from "./App";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AIProvider>
      <App />
      <Toaster position="top-right" />
    </AIProvider>
  </StrictMode>
);