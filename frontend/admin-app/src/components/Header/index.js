import React from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import { NavLink, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { signOut } from "../../action/auth.actions";
export default function Header() {
  const auth = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const signOutUser = () => {
    dispatch(signOut());
  };

  const renderLoggedInLinks = () => {
    return (
      <Nav>
        <li>
          <span className="nav-link" onClick={signOutUser}>
            SignOut
          </span>
        </li>
      </Nav>
    );
  };

  const renderNonLoggedInLinks = () => {
    return (
      <Nav>
        <li>
          <NavLink to="/signin" className="nav-link">
            SignIn
          </NavLink>
        </li>
        <li>
          <NavLink to="/signup" className="nav-link">
            SignUp
          </NavLink>
        </li>
      </Nav>
    );
  };
  return (
    <Navbar
      collapseOnSelect
      expand="lg"
      bg="dark"
      variant="dark"
      style={{ zIndex: 1 }}
    >
      <Container fluid>
        <Link to="/" className="navbar-brand">
          Admin Dashboard
        </Link>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      </Container>
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="mr-auto"></Nav>
        {auth.authenticate ? renderLoggedInLinks() : renderNonLoggedInLinks()}
      </Navbar.Collapse>
    </Navbar>
  );
}
