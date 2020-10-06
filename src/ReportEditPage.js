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
  const primaryAction = { content: "Save" };
  const [name, setName] = useState("New Report");
  const [format, setFormat] = useState("excel");
  const pageTitle = useMemo(() => {
    return "New Report" + (name.length > 0 ? " - " + name : "");
  }, [name]);
  const handleNameChange = useCallback((newName) => setName(newName), []);
  const handleFormatChange = useCallback(newFormat => setFormat(newFormat), []);

  return (
    <Page
      title={pageTitle}
      breadcrumbs={breadcrumbs}
      primaryAction={primaryAction}
    >
      <Layout>
        <Layout.Section>
          <ReportFieldSelection />
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

function ReportFieldSelection() {
  const fieldSections = Object.entries(Fields).map(([section, fields]) => (
    <FieldSection title={section} fields={fields} key={section} />
  ));

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

function ReportSettings(props) {
  const fileName = useMemo(() => {
    let date = new Date().toISOString().split("T")[0];
    let format = {'csv': '.csv', 'excel': '.xls'}[props.format] || '.xyz'
    return date + " - " + props.name + format;
  }, [props.name, props.format]);

  return (
    <Card title="Settings">
      <Card.Section>
        <TextField label="Report Name" value={props.name} onChange={props.onChange} />
      </Card.Section>
      <Card.Section title="File">
        <Stack vertical>
          <FormatSelection format={props.format} onFormatChange={props.onFormatChange} />
          <p>
            <span>Filename: </span>
            <Tag>{fileName}</Tag>
          </p>
        </Stack>
      </Card.Section>
    </Card>
  );
}

function FormatSelection(props) {
  const format = props.format;
  const handleFormatSelect = props.onFormatChange;
  const options = [
    { label: "Excel", value: 'excel' },
    { label: "CSV", value: 'csv' },
  ];

  return <Select label="Format" options={options} onChange={handleFormatSelect} value={format} />;
}
