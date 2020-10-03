import React, { useState, useCallback } from "react";

import { ChoiceList, Stack } from "@shopify/polaris";

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
  const half = Math.ceil(choices.length / 2);    
  const firstHalf = choices.splice(0, half)
  const secondHalf = choices.splice(-half)

  return (
    <Stack wrap={false} distribution="fill">
      <ChoiceList
        allowMultiple
        choices={firstHalf}
        selected={selected}
        onChange={handleChange}
      />
      <ChoiceList
        allowMultiple
        choices={secondHalf}
        selected={selected}
        onChange={handleChange}
      />
    </Stack>
  );
}
