import React from "react";
import { Form } from "react-bootstrap";

export default function Input(props) {
  return (
    <Form>
      <Form.Group controlId="formBasicEmail">
        <Form.Label>{props.label}</Form.Label>
        <Form.Control type={props.type} placeholder={props.placeholder} />
      </Form.Group>
    </Form>
  );
}
