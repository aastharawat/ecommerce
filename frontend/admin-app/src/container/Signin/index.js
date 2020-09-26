import React, { useState } from "react";
import { Container, Form, Button, Col, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import { login } from "../../action/auth.actions";
import Layout from "../../components/layout";
import Input from "../../components/UI/Input/input";

export default function Signin() {
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const auth = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  const userLogin = (e) => {
    e.preventDefault();
    const user = { email, password };
    dispatch(login(user));
  };
  if (auth.authenticate) {
    return <Redirect to="/" />;
  }
  return (
    <Layout>
      <Container>
        <Row style={{ margin: "50px" }}>
          <Col md={{ span: 6, offset: 3 }}>
            <Form onSubmit={userLogin}>
              <Input
                label="Email address"
                placeholder="Enter email"
                type="email"
                value={email}
                onChange={(e) => {
                  setemail(e.target.value);
                }}
              />
              <Input
                label="Email password"
                placeholder="Enter password"
                type="password"
                value={password}
                onChange={(e) => {
                  setpassword(e.target.value);
                }}
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
