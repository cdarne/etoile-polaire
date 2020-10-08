import React, { useMemo } from "react";
import {
  Card,
  TextField,
  Tag,
  Stack,
  Select
} from "@shopify/polaris";

export default function ReportSettings({ name, format, onChange, onFormatChange }) {
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