import React from "react";

import "@shopify/polaris/dist/styles.css";
import enTranslations from "@shopify/polaris/locales/en.json";
import { AppProvider } from "@shopify/polaris";

// import UserPage from "./UserPage";
import EditReportPage from "./edit_report/EditReportPage";

export default function App() {
  return (
    <AppProvider i18n={enTranslations}>
      <EditReportPage />
    </AppProvider>
  );
}
