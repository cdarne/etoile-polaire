import React, { useMemo } from "react";

import { ChoiceList, Stack } from "@shopify/polaris";

function useChoices(fields) {
  return useMemo(() => {
    const choices = fields.map((field) => {
      return {
        label: field,
        value: field,
        helpText: "This is the " + field + " field."
      };
    });
    const half = Math.ceil(choices.length / 2);
    return {
      firstHalf: choices.splice(0, half),
      secondHalf: choices.splice(-half)
    };
  }, [fields]);
}

export default function FieldChoiceList({ fields, selected, onFieldSelection }) {
  const choices = useChoices(fields);

  return (
    <Stack wrap={false} distribution="fill">
      <ChoiceList
        allowMultiple
        choices={choices.firstHalf}
        selected={selected}
        onChange={onFieldSelection}
      />
      <ChoiceList
        allowMultiple
        choices={choices.secondHalf}
        selected={selected}
        onChange={onFieldSelection}
      />
    </Stack>
  );
}
