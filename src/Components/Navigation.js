import React from "react";

import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";

import {NavLink} from 'react-router-dom'
import { useUser } from "../context/userContext/UserProvider";

const Navigation = () => {

  const {user,exitUserfn} = useUser()

  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container>
        <Navbar.Brand as={NavLink} to="/">Snippet Manager</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">

          <Nav className="me-auto">
            <Nav.Link as={NavLink} to="/">Home</Nav.Link>
          </Nav>

          <Nav>
            {user.token ?(
              <Nav.Link as={NavLink} onClick={exitUserfn} to="/login">Logout</Nav.Link>
            ):(
              <Nav.Link as={NavLink} to="/login">Login</Nav.Link>
            )}
          </Nav>
          
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Navigation;
