import React, { useState } from "react";
import Layout from "../../components/layout";
import { Container, Form, Button, Col, Row } from "react-bootstrap";
import Input from "../../components/UI/Input/input";
import { Redirect } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { signUp } from "../../action/index";

export default function Signup() {
  const dispatch = useDispatch();

  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [firstName, setfirstName] = useState("");
  const [lastName, setlastName] = useState("");
  const [role, setrole] = useState("");
  const [contact, setcontact] = useState("");
  const [userName, setusername] = useState("");

  const auth = useSelector((state) => state.auth);
  if (auth.authenticate) {
    return <Redirect to="/" />;
  }
  const registerUser = (e) => {
    const user = {
      firstName,
      lastName,
      userName,
      email,
      password,
      role,
      contact,
    };
    dispatch(signUp(user));
  };
  return (
    <Layout>
      <Container>
        <Row style={{ margin: "50px" }}>
          <Col md={{ span: 6, offset: 3 }}>
            <Form onSubmit={registerUser}>
              <Row>
                <Col md={{ span: 6 }}>
                  <Input
                    label="First Name"
                    placeholder="Enter firstName"
                    type="text"
                    onChange={(e) => setfirstName(e.target.value)}
                  />
                </Col>

                <Col md={{ span: 6 }}>
                  <Input
                    label="Last Name"
                    placeholder="Enter lastName"
                    type="text"
                    onChange={(e) => setlastName(e.target.value)}
                  />
                </Col>
              </Row>

              <Input
                label="Email address"
                placeholder="Enter email"
                type="email"
                onChange={(e) => setemail(e.target.value)}
              />
              <Input
                label="Email password"
                placeholder="Enter password"
                type="password"
                onChange={(e) => setpassword(e.target.value)}
              />

              <Input
                label="Username"
                placeholder="Enter username"
                type="text"
                onChange={(e) => setusername(e.target.value)}
              />
              <Row>
                <Col md={{ span: 6 }}>
                  <Input
                    label="Role"
                    placeholder="Enter role"
                    type="text"
                    onChange={(e) => setrole(e.target.value)}
                  />
                </Col>

                <Col md={{ span: 6 }}>
                  <Input
                    label="Contact"
                    placeholder="Enter contact"
                    type="text"
                    onChange={(e) => setcontact(e.target.value)}
                  />
                </Col>
              </Row>

              <Button variant="primary" type="submit">
                SignUp
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
    </Layout>
  );
}
