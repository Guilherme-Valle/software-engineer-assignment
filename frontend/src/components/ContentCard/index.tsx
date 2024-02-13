import React from "react";
import { Card } from "react-bootstrap";

export default function ContentCard({ children }: { children: React.ReactNode }) {
  return (
    <Card style={{ width: '100%', backgroundColor: 'white' }}>
      <Card.Body>
        {children}
      </Card.Body>
    </Card>
  )
}
