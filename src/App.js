import React from "react";

import "@shopify/polaris/dist/styles.css";
import enTranslations from "@shopify/polaris/locales/en.json";
import { AppProvider } from "@shopify/polaris";

// import UserPage from "./UserPage";
import ReportEditPage from "./ReportEditPage";

export default function App() {
  return (
    <AppProvider i18n={enTranslations}>
      <ReportEditPage />
    </AppProvider>
  );
}
