import React from "react";
import {
  Navbar,
  NavDropdown,
  Nav,
  Form,
  Container,
  Button,
  FormControl,
} from "react-bootstrap";
function MainNav() {
  return (
    <>
      <Navbar expand="lg" id="navbar" bg="dark" variant="dark" fixed="top">
        <Container fluid>
          <Navbar.Brand href="#">UserName</Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav
              className="me-auto my-2 my-lg-0"
              style={{ maxHeight: "100px" }}
              navbarScroll
            >
              <Nav.Link href="#action1">Home</Nav.Link>
              <Nav.Link href="#action2" target="_blank">
                Github
              </Nav.Link>
            </Nav>
            <Form className="d-flex">
              <FormControl
                type="search"
                placeholder="Search"
                className="me-2"
                aria-label="Search"
              />
              <Button variant="primary">Search</Button>
            </Form>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}

export default MainNav;
