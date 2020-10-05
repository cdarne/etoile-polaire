import React, { useState, useCallback, useMemo } from "react";

import {
  Page,
  Layout,
  Card,
  PageActions,
  TextField,
  Tag,
  Link
} from "@shopify/polaris";

import FieldSection from "./FieldSection";
import Fields from "./fields.js";

export default function ReportEditPage() {
  const breadcrumbs = [{ content: "Back" }];
  const primaryAction = { content: "Save" };
  const [name, setName] = useState("");
  const pageTitle = useMemo(() => {
    return "New Report" + (name.length > 0 ? " - " + name : "");
  }, [name]);
  const handleNameChange = useCallback((newName) => setName(newName), []);

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
          <ReportSettings name={name} onChange={handleNameChange} />
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
    return date + " - " + props.name + ".xls";
  }, [props.name]);

  return (
    <Card title="Settings">
      <Card.Section>
        <TextField label="Name" value={props.name} onChange={props.onChange} />
      </Card.Section>
      <Card.Section title="File" actions={[{ content: "Edit" }]}>
        <p>
          <span>Format: </span>
          <Tag>Excel</Tag>
        </p>
        <p>
          <span>Filename: </span>
          <Tag>{fileName}</Tag>
        </p>
      </Card.Section>
      <Card.Section title="Notification" actions={[{ content: "Edit" }]}>
        <p>cedric.darne@gmail.com</p>
      </Card.Section>
    </Card>
  );
}
