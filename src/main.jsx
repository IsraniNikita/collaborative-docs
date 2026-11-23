import React from "react";
import ReactDOM from "react-dom/client";

import App from "./App";
import { AppProviders } from "./app/providers/AppProviders";
import { migrateLegacyStorage } from "./features/collaboration/services/legacyStorageMigration";
import "./shared/styles/global.css";

migrateLegacyStorage();

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AppProviders>
      <App />
    </AppProviders>
  </React.StrictMode>
);