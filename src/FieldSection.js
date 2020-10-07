import React, { useState, useCallback, useMemo } from "react";

import { Button, Stack, Collapsible, Tag } from "@shopify/polaris";

import FieldChoiceList from "./FieldChoiceList";

function useToggled(initialActive) {
  const [active, setActive] = useState(initialActive);
  const handleToggle = useCallback(() => setActive((active) => !active), []);
  return [active, handleToggle];
}

export default function FieldSection({title, fields, selected, onFieldSelected}) {
  const [active, handleToggle] = useToggled(false);
  
  const selectionHint = useMemo(() => {
    return `${selected.length} of ${fields.length} columns`;
  }, [selected, fields]);

  return (
    <Stack vertical>
      <Stack alignment="center">
        <Button onClick={handleToggle}>{title}</Button>
        <Tag>{selectionHint}</Tag>
      </Stack>
      <Collapsible open={active}>
        <FieldChoiceList fields={fields} selected={selected} onFieldSelected={onFieldSelected} />
      </Collapsible>
    </Stack>
  );
}
