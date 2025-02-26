import React from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const CustomNavbar = () => {
  return (
    <Navbar bg="primary" expand="lg">
      <Container>
      <Navbar.Brand href="/"><img
        width="100"
        height="100"
        alt=""
        src='logoIts.png'/></Navbar.Brand>
        <Navbar.Brand as={Link} to="/">Accademia</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/">Home</Nav.Link>
            <Nav.Link as={Link} to="/persona">Persona</Nav.Link>
            <Nav.Link as={Link} to="/assenza">Assenze</Nav.Link>
            <Nav.Link as={Link} to="/attivita">Attività non Progettuali</Nav.Link>
            <Nav.Link as={Link} to="/about">About</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default CustomNavbar;
// bg="light" expand="lg"  7