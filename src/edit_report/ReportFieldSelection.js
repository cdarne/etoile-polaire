import React, { useMemo } from "react";
import {
  Card
} from "@shopify/polaris";

import FieldSection from './FieldSection';
import Fields from "./fields.js";

export default function ReportFieldSelection({ selected, onFieldSelected }) {
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