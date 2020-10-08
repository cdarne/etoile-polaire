import React, { useState, useCallback, useMemo } from "react";
import {
  Page,
  Layout,
  Card,
  PageActions,
  TextField,
  Tag,
  Link,
  Stack,
  Select
} from "@shopify/polaris";

import ReportFieldSelection from "./ReportFieldSelection";
import ReportHelp from "./ReportHelp";
import ReportSettings from "./ReportSettings";

function useSelected(initialSelected) {
  const [selected, setSelected] = useState(initialSelected);
  const handleFieldSelection = useCallback((value) => setSelected(value), []);
  return [selected, handleFieldSelection];
}

export default function EditReportPage() {
  const breadcrumbs = [{ content: "Back" }];
  const primaryAction = {
    content: "Save",
    onAction: () => {
      const model = JSON.stringify({ name: name, format: format, selected: selected });
      alert(`Saving report...\n${model}`);
    }
  };
  const [name, setName] = useState("New Report");
  const [format, setFormat] = useState("excel");
  const pageTitle = useMemo(() => {
    return "New Report" + (name.length > 0 ? " - " + name : "");
  }, [name]);
  const handleNameChange = useCallback((newName) => setName(newName), []);
  const handleFormatChange = useCallback(newFormat => setFormat(newFormat), []);
  const [selected, handleFieldSelection] = useSelected(["ID", "Name", "Phone"]);

  return (
    <Page
      title={pageTitle}
      breadcrumbs={breadcrumbs}
      primaryAction={primaryAction}
    >
      <Layout>
        <Layout.Section>
          <ReportFieldSelection selected={selected} onFieldSelected={handleFieldSelection} />
          <ReportHelp />
        </Layout.Section>
        <Layout.Section secondary>
          <ReportSettings name={name} onChange={handleNameChange} format={format} onFormatChange={handleFormatChange} />
        </Layout.Section>
      </Layout>
      <PageActions primaryAction={primaryAction} />
    </Page>
  );
}