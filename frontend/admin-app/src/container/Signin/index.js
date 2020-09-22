import React from "react";
import { Container, Form, Button, Col, Row } from "react-bootstrap";
import Layout from "../../components/layout";
import Input from "../../components/UI/Input/input";

export default function Signin() {
  return (
    <Layout>
      <Container>
        <Row style={{ margin: "50px" }}>
          <Col md={{ span: 6, offset: 3 }}>
            <Form>
              <Input
                label="Email address"
                placeholder="Enter email"
                type="email"
              />
              <Input
                label="Email password"
                placeholder="Enter password"
                type="password"
              />
              <Button variant="primary" type="submit">
                SignIn
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
    </Layout>
  );
}
