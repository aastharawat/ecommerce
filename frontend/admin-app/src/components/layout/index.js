import React from "react";
import Header from "../Header/index";
import { Col, Container, Row } from "react-bootstrap";
import { NavLink } from "react-router-dom";
export default function Layout(props) {
  return (
    <div>
      <Header />
      {props.sidebar ? (
        <Container fluid>
          <Row>
            <Col md={2} className="sidebar">
              <Row>
                <ul>
                  <li>
                    <NavLink to={"/"}>Home</NavLink>
                  </li>
                  <li>
                    <NavLink to={"/category"}>Category</NavLink>
                  </li>
                  <li>
                    <NavLink to={"/products"}>Products</NavLink>
                  </li>
                  <li>
                    <NavLink to={"/orders"}>Orders</NavLink>
                  </li>
                </ul>
              </Row>
            </Col>
            <Col md={10} style={{ marginLeft: "auto" }}>
              {props.children}
            </Col>
          </Row>
        </Container>
      ) : (
        <div>{props.children}</div>
      )}
    </div>
  );
}
