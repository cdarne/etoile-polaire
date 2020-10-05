import React, { useState, useCallback, useMemo } from "react";

import { Button, Stack, Collapsible, Tag } from "@shopify/polaris";

import FieldChoiceList from "./FieldChoiceList";

export default function FieldSection(props) {
  const [active, setActive] = useState(false);
  const handleToggle = useCallback(() => setActive((active) => !active), []);
  
  const [selected, setSelected] = useState([]);
  const handleFieldSelection = useCallback((value) => setSelected(value), []);
  const selectionHint = useMemo(() => {
    return `${selected.length} of ${props.fields.length} columns`;
  }, [selected, props.fields]);

  return (
    <Stack vertical>
      <Stack alignment="center">
        <Button onClick={handleToggle}>{props.title}</Button>
        <Tag>{selectionHint}</Tag>
      </Stack>
      <Collapsible open={active}>
        <FieldChoiceList fields={props.fields} selected={selected} onFieldSelection={handleFieldSelection} />
      </Collapsible>
    </Stack>
  );
}
