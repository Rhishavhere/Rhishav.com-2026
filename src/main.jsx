import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import "@/utils/eases";
import App from "@/App";
import "@/i18n";
import AppLayout from "@/layouts/AppLayout";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <BrowserRouter
      future={{
        v7_startTransition: true,
        v7_relativeSplatPath: true,
      }}
    >
      <AppLayout>
        <App />
      </AppLayout>
    </BrowserRouter>
  </React.StrictMode>,
);
