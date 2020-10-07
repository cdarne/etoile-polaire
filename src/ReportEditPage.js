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

import FieldSection from "./FieldSection";
import Fields from "./fields.js";

export default function ReportEditPage() {
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

function useSelected(initialSelected) {
  const [selected, setSelected] = useState(initialSelected);
  const handleFieldSelection = useCallback((value) => setSelected(value), []);
  return [selected, handleFieldSelection];
}

function ReportFieldSelection({ selected, onFieldSelected }) {
  const fieldSections = useMemo(() => {
    return Object.entries(Fields).map(([section, fields]) => (
      <FieldSection title={section} fields={fields} key={section} selected={selected} onFieldSelected={onFieldSelected} />
    ));
  }, [selected, onFieldSelected]);

  return (
    <Card title="Select Fields" sectioned>
      <p>Select the fields you want to export.</p>
      {fieldSections}
    </Card>
  );
}

function ReportHelp() {
  return (
    <Card title="Help">
      <Card.Section title="Documentation">
        <p>
          You can find a comprehensive explanation on the report settings at the{" "}
          <Link url="https://help.shopify.com/manual/orders/fulfill-orders">
            documentation
          </Link>{" "}
          page.
        </p>
      </Card.Section>
    </Card>
  );
}

function ReportSettings({ name, format, onChange, onFormatChange }) {
  const fileName = useMemo(() => {
    const date = new Date().toISOString().split("T")[0];
    const extension = { 'csv': '.csv', 'excel': '.xls' }[format] || '.xyz'
    return date + " - " + name + extension;
  }, [name, format]);

  return (
    <Card title="Settings">
      <Card.Section>
        <TextField label="Report Name" value={name} onChange={onChange} />
      </Card.Section>
      <Card.Section title="File">
        <Stack vertical>
          <FormatSelection format={format} onFormatChange={onFormatChange} />
          <p>
            <span>Filename: </span>
            <Tag>{fileName}</Tag>
          </p>
        </Stack>
      </Card.Section>
    </Card>
  );
}

function FormatSelection({ format, onFormatChange }) {
  const options = [
    { label: "Excel", value: 'excel' },
    { label: "CSV", value: 'csv' },
  ];

  return <Select label="Format" options={options} onChange={onFormatChange} value={format} />;
}
