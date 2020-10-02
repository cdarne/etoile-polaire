import React, { useState, useCallback } from "react";

import { ChoiceList } from "@shopify/polaris";

export default function FieldChoiceList(props) {
  const [selected, setSelected] = useState([]);
  const handleChange = useCallback((value) => setSelected(value), []);
  const choices = props.fields.map((field) => {
    return {
      label: field,
      value: field,
      helpText: "This is the " + field + " field."
    };
  });
  return (
    <ChoiceList
      allowMultiple
      choices={choices}
      selected={selected}
      onChange={handleChange}
    />
  );
}
