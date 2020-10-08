import React from "react";
import {
  Card,
  Link,
} from "@shopify/polaris";

export default function ReportHelp() {
  return (
    <Card title="Help">
      <Card.Section title="Documentation">
        <p>
          You can find a comprehensive explanation on the report settings at the
          <Link url="https://help.shopify.com/manual/orders/fulfill-orders">
            documentation
          </Link>
          page.
        </p>
      </Card.Section>
    </Card>
  );
}