import React from "react";
import { Form } from "react-bootstrap";

export default function Input(props) {
  return (
    <Form.Group>
      <Form.Label>{props.label}</Form.Label>
      <Form.Control
        type={props.type}
        placeholder={props.placeholder}
        onChange={(e) => props.onChange(e)}
      />
    </Form.Group>
  );
}
