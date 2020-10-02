import React, { useState, useCallback } from "react";

import { Button, Stack, Collapsible } from "@shopify/polaris";

import FieldChoiceList from "./FieldChoiceList";

export default function FieldSection(props) {
  const [active, setActive] = useState(false);
  const handleToggle = useCallback(() => setActive((active) => !active), []);

  return (
    <Stack vertical>
      <Button onClick={handleToggle}>{props.title}</Button>
      <Collapsible open={active}>
        <FieldChoiceList fields={props.fields} />
      </Collapsible>
    </Stack>
  );
}
