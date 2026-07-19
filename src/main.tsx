import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import "leaflet/dist/leaflet.css";

import { Toaster } from "react-hot-toast";

import App from "./App";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <>
      <App />

      <Toaster
        position="top-right"
        reverseOrder={false}
        toastOptions={{
          duration: 3000,

          style: {
            background: "#0f172a",
            color: "#ffffff",
            border: "1px solid #334155",
            borderRadius: "12px",
          },

          success: {
            iconTheme: {
              primary: "#22c55e",
              secondary: "#ffffff",
            },
          },

          error: {
            iconTheme: {
              primary: "#ef4444",
              secondary: "#ffffff",
            },
          },
        }}
      />
    </>
  </StrictMode>
);