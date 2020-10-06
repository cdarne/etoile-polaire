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
  Tabs
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
          <ReportEditSection />
        </Layout.Section>
        <Layout.Section secondary>
          <ReportSettings name={name} onChange={handleNameChange} />
        </Layout.Section>
      </Layout>
      <PageActions primaryAction={primaryAction} />
    </Page>
  );
}

function ReportEditSection() {
  const [selected, setSelected] = useState(0);
  const handleSelect = useCallback((index) => setSelected(index), []);
  const tabs = [
    {
      id: 'field-selection',
      content: "Field selection",
      panelID: 'field-selection-content',
    },
    {
      id: 'field-layout',
      content: "Layout",
      panelID: 'layout-content',
    },
  ];

  const contents = [
    (<div>
      <ReportFieldSelection />
      <ReportHelp />
    </div>),

    (<Card title="Layout">
    </Card>)
  ]

  return (
    <Card>
      <Tabs tabs={tabs} selected={selected} onSelect={handleSelect} fitted>
        {contents[selected]}
      </Tabs>
    </Card>
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
        <Stack vertical>
          <p>
            <span>Format: </span>
            <Tag>Excel</Tag>
          </p>
          <p>
            <span>Filename: </span>
            <Tag>{fileName}</Tag>
          </p>
        </Stack>
      </Card.Section>
      <Card.Section title="Notification" actions={[{ content: "Edit" }]}>
        <p>cedric.darne@gmail.com</p>
      </Card.Section>
    </Card>
  );
}
